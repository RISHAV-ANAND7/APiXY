/**
 * Parse a cURL command into an object with method, url, headers, and data
 */
export const parseCurl = (curlCommand) => {
  if (!curlCommand || typeof curlCommand !== 'string') return null;

  const cleanCommand = curlCommand
    .replace(/\\\n/g, ' ')
    .replace(/\\\r\n/g, ' ')
    .trim();

  let method = 'GET';
  let url = '';
  const headers = [];
  let body = '';

  // Extract Method
  const methodMatch = cleanCommand.match(/-X\s+([A-Z]+)|--request\s+([A-Z]+)/i);
  if (methodMatch) {
    method = (methodMatch[1] || methodMatch[2]).toUpperCase();
  }

  // Extract URL
  const urlMatches = cleanCommand.match(/(?:curl\s+)?['"]?(https?:\/\/[^\s'"]+)/i);
  if (urlMatches) {
    url = urlMatches[1];
  } else {
    // fallback check without protocol
    const fallbackMatch = cleanCommand.match(/curl\s+['"]([^'"]+)['"]/);
    if (fallbackMatch) url = fallbackMatch[1];
  }

  // Extract Headers (-H or --header)
  const headerRegex = /(?:-H|--header)\s+['"]([^'"]+)['"]/g;
  let headerMatch;
  let headerId = 0;
  while ((headerMatch = headerRegex.exec(cleanCommand)) !== null) {
    const fullHeader = headerMatch[1];
    const colonIndex = fullHeader.indexOf(':');
    if (colonIndex > 0) {
      const key = fullHeader.slice(0, colonIndex).trim();
      const value = fullHeader.slice(colonIndex + 1).trim();
      headers.push({ id: headerId++, check: true, key, value });
    }
  }

  // Extract Data / Body (-d, --data, --data-raw)
  const dataMatch = cleanCommand.match(/(?:-d|--data|--data-raw)\s+['"]([\s\S]*?)['"](?:\s|$)/);
  if (dataMatch) {
    body = dataMatch[1];
    if (method === 'GET' && !methodMatch) {
      method = 'POST'; // curl defaults to POST when -d is present
    }
  }

  return {
    method,
    url,
    headers,
    body
  };
};

/**
 * Generate a valid cURL command from current request parameters
 */
export const generateCurl = (method, url, headers = [], params = [], body = '') => {
  if (!url) return '';

  let finalUrl = url;
  const activeParams = params.filter((p) => p.check && p.key);
  if (activeParams.length > 0) {
    try {
      const parsedUrl = new URL(url.startsWith('http') ? url : `https://${url}`);
      activeParams.forEach((p) => {
        parsedUrl.searchParams.set(p.key, p.value || '');
      });
      finalUrl = parsedUrl.toString();
    } catch {
      // If relative or variable url
      const queryStr = activeParams.map((p) => `${encodeURIComponent(p.key)}=${encodeURIComponent(p.value || '')}`).join('&');
      finalUrl = finalUrl.includes('?') ? `${finalUrl}&${queryStr}` : `${finalUrl}?${queryStr}`;
    }
  }

  let curl = `curl --request ${method} \\\n  --url '${finalUrl}'`;

  const activeHeaders = headers.filter((h) => h.check && h.key);
  activeHeaders.forEach((h) => {
    curl += ` \\\n  --header '${h.key}: ${h.value || ''}'`;
  });

  if (body && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
    const escapedBody = body.replace(/'/g, "'\\''");
    curl += ` \\\n  --data '${escapedBody}'`;
  }

  return curl;
};

