/**
 * Checks if a string is valid JSON. Empty or whitespace is considered valid (no body).
 */
export const checkValidJson = (text) => {
  if (!text || text.trim() === '') {
    return true;
  }
  try {
    JSON.parse(text);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validate request parameters before sending
 */
export const checkParams = (formData, jsonText, setErrorMsg) => {
  if (!formData.url || formData.url.trim() === '') {
    setErrorMsg('Request URL is empty. Please enter a valid URL.');
    return false;
  }

  if (jsonText && jsonText.trim() !== '') {
    if (!checkValidJson(jsonText)) {
      setErrorMsg('Invalid JSON body format. Please check syntax.');
      return false;
    }
  }

  return true;
};

/**
 * Extract active key-value pairs from array of entries
 */
export const getHeadersAndParams = (objArr = []) => {
  const obj = {};
  if (!Array.isArray(objArr)) return obj;
  objArr.forEach((data) => {
    if (data && data.check && data.key && data.key.trim() !== '') {
      obj[data.key.trim()] = data.value !== undefined ? data.value : '';
    }
  });
  return obj;
};

/**
 * Replace {{variableName}} placeholders with values from environments
 */
export const resolveVariables = (str, envVars = []) => {
  if (!str || typeof str !== 'string' || !Array.isArray(envVars)) return str;
  let resolved = str;
  envVars.forEach(({ key, value, check }) => {
    if (check !== false && key && key.trim() !== '') {
      const regex = new RegExp(`{{\\s*${key.trim()}\\s*}}`, 'g');
      resolved = resolved.replace(regex, value || '');
    }
  });
  return resolved;
};

/**
 * Format bytes into human readable format (KB, MB, B)
 */
export const formatBytes = (bytes) => {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
