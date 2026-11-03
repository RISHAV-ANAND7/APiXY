import axios from "axios";
import { getHeadersAndParams, resolveVariables } from "../utils/commonutils";

export const getData = async (formData, jsonText, paramData, headerData, authData = {}, envVars = []) => {
  let apiUrl = resolveVariables(formData.url?.trim() || '', envVars);
  const apiType = (formData.type || 'GET').toLowerCase();

  // If user omitted protocol, default to https://
  if (apiUrl && !apiUrl.startsWith('http://') && !apiUrl.startsWith('https://')) {
    apiUrl = `https://${apiUrl}`;
  }

  // Resolve headers and params
  const rawHeaders = getHeadersAndParams(headerData);
  const rawParams = getHeadersAndParams(paramData);

  const apiHeaders = {};
  Object.keys(rawHeaders).forEach((k) => {
    apiHeaders[resolveVariables(k, envVars)] = resolveVariables(rawHeaders[k], envVars);
  });

  const apiParams = {};
  Object.keys(rawParams).forEach((k) => {
    apiParams[resolveVariables(k, envVars)] = resolveVariables(rawParams[k], envVars);
  });

  // Handle Authentication injection
  if (authData && authData.type) {
    if (authData.type === 'bearer' && authData.token) {
      apiHeaders['Authorization'] = `Bearer ${resolveVariables(authData.token, envVars)}`;
    } else if (authData.type === 'basic' && (authData.username || authData.password)) {
      const creds = btoa(`${resolveVariables(authData.username || '', envVars)}:${resolveVariables(authData.password || '', envVars)}`);
      apiHeaders['Authorization'] = `Basic ${creds}`;
    } else if (authData.type === 'apikey' && authData.key && authData.value) {
      const resolvedKey = resolveVariables(authData.key, envVars);
      const resolvedVal = resolveVariables(authData.value, envVars);
      if (authData.addTo === 'query') {
        apiParams[resolvedKey] = resolvedVal;
      } else {
        apiHeaders[resolvedKey] = resolvedVal;
      }
    }
  }

  // Resolve JSON Body
  let resolvedBody = undefined;
  if (jsonText && jsonText.trim() !== '' && ['post', 'put', 'patch', 'delete'].includes(apiType)) {
    const rawResolved = resolveVariables(jsonText, envVars);
    try {
      resolvedBody = JSON.parse(rawResolved);
      if (!apiHeaders['Content-Type']) {
        apiHeaders['Content-Type'] = 'application/json';
      }
    } catch {
      resolvedBody = rawResolved;
    }
  }

  const startTime = performance.now();

  try {
    const response = await axios({
      method: apiType,
      url: apiUrl,
      data: resolvedBody,
      headers: apiHeaders,
      params: apiParams,
      timeout: 30000,
      validateStatus: () => true, // Don't throw for 4xx/5xx so we inspect real responses
    });

    const endTime = performance.now();
    const duration = Math.round(endTime - startTime);

    // Estimate size
    let size = 0;
    if (response.headers && response.headers['content-length']) {
      size = parseInt(response.headers['content-length'], 10);
    } else if (response.data) {
      try {
        size = new Blob([typeof response.data === 'string' ? response.data : JSON.stringify(response.data)]).size;
      } catch {
        size = 0;
      }
    }

    return {
      success: true,
      status: response.status,
      statusText: response.statusText || getStatusText(response.status),
      data: response.data,
      headers: response.headers || {},
      time: duration,
      size,
      url: apiUrl,
      method: formData.type,
    };
  } catch (error) {
    const endTime = performance.now();
    const duration = Math.round(endTime - startTime);
    console.error("API Request Failed:", error);

    return {
      success: false,
      error: true,
      status: error.response?.status || 0,
      statusText: error.response?.statusText || (error.code === 'ERR_NETWORK' ? 'Network / CORS Error' : error.message || 'Request Failed'),
      data: error.response?.data || {
        error: error.message || "Failed to fetch response",
        details: "Network connection refused, invalid certificate, or blocked by Cross-Origin Resource Sharing (CORS).",
        code: error.code || "ERR_NETWORK"
      },
      headers: error.response?.headers || {},
      time: duration,
      size: 0,
      url: apiUrl,
      method: formData.type,
      errorMessage: error.message || 'Unknown network error'
    };
  }
};

const getStatusText = (code) => {
  const map = {
    200: 'OK',
    201: 'Created',
    202: 'Accepted',
    204: 'No Content',
    301: 'Moved Permanently',
    302: 'Found',
    304: 'Not Modified',
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    409: 'Conflict',
    422: 'Unprocessable Entity',
    429: 'Too Many Requests',
    500: 'Internal Server Error',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout'
  };
  return map[code] || 'Status ' + code;
};
