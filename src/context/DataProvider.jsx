import { useState, useEffect, useCallback } from 'react';
import { DataContext } from './DataContext';

export { DataContext };

const STORAGE_KEYS = {
  HISTORY: 'apixy_history_v1',
  COLLECTIONS: 'apixy_collections_v1',
  ENVIRONMENTS: 'apixy_environments_v1',
  ACTIVE_ENV: 'apixy_active_env_v1',
};

export const DataProvider = ({ children }) => {
  // Primary Request State
  const [formData, setFormData] = useState({
    url: '',
    type: 'GET',
  });
  const [paramData, setParamData] = useState([]);
  const [headerData, setHeaderData] = useState([]);
  const [jsonText, setJsonText] = useState('');
  const [authData, setAuthData] = useState({
    type: 'none',
    token: '',
    username: '',
    password: '',
    key: '',
    value: '',
    addTo: 'header',
  });

  // History State
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.HISTORY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Collections State
  const [collections, setCollections] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COLLECTIONS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Environments State
  const [environments, setEnvironments] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ENVIRONMENTS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeEnvId, setActiveEnvId] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.ACTIVE_ENV) || '';
    } catch {
      return '';
    }
  });

  // Save to localStorage when state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
    } catch (e) {
      console.warn('Could not save history to localStorage', e);
    }
  }, [history]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COLLECTIONS, JSON.stringify(collections));
    } catch (e) {
      console.warn('Could not save collections to localStorage', e);
    }
  }, [collections]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ENVIRONMENTS, JSON.stringify(environments));
    } catch (e) {
      console.warn('Could not save environments to localStorage', e);
    }
  }, [environments]);

  useEffect(() => {
    try {
      if (activeEnvId) {
        localStorage.setItem(STORAGE_KEYS.ACTIVE_ENV, activeEnvId);
      } else {
        localStorage.removeItem(STORAGE_KEYS.ACTIVE_ENV);
      }
    } catch (e) {
      console.warn('Could not save active env to localStorage', e);
    }
  }, [activeEnvId]);

  // Active environment object & variables
  const activeEnvironment = environments.find((e) => e.id === activeEnvId) || null;
  const activeEnvVariables = activeEnvironment ? activeEnvironment.variables : [];

  // Helper: load a request specification into active state
  const loadRequest = useCallback((req) => {
    if (!req) return;
    setFormData({
      url: req.url || '',
      type: (req.method || 'GET').toUpperCase(),
    });
    setParamData(Array.isArray(req.params) ? req.params : []);
    setHeaderData(Array.isArray(req.headers) ? req.headers : []);
    setJsonText(typeof req.body === 'string' ? req.body : req.body ? JSON.stringify(req.body, null, 2) : '');
    setAuthData(
      req.auth || {
        type: 'none',
        token: '',
        username: '',
        password: '',
        key: '',
        value: '',
        addTo: 'header',
      }
    );
  }, []);

  // Helper: record to history
  const addHistoryItem = useCallback((item) => {
    setHistory((prev) => {
      const newEntry = {
        id: 'hist_' + Date.now() + Math.random().toString(36).substring(2, 6),
        timestamp: new Date().toISOString(),
        method: item.method,
        url: item.url,
        status: item.status,
        statusText: item.statusText,
        time: item.time,
        size: item.size,
        requestSnapshot: {
          formData: { url: item.url, type: item.method },
          paramData: item.paramData,
          headerData: item.headerData,
          jsonText: item.jsonText,
          authData: item.authData,
        },
        responseSnapshot: item.responseSnapshot,
      };
      return [newEntry, ...prev.slice(0, 49)];
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const removeHistoryItem = useCallback((id) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // Helper: save to collections
  const saveToCollection = useCallback((name, group = 'General') => {
    const newItem = {
      id: 'coll_' + Date.now(),
      name: name || `${formData.type} ${formData.url.substring(0, 30)}`,
      group: group || 'General',
      method: formData.type,
      url: formData.url,
      params: [...paramData],
      headers: [...headerData],
      body: jsonText,
      auth: { ...authData },
      createdAt: new Date().toISOString(),
    };
    setCollections((prev) => [newItem, ...prev]);
    return newItem;
  }, [formData, paramData, headerData, jsonText, authData]);

  const removeCollectionItem = useCallback((id) => {
    setCollections((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return (
    <DataContext.Provider
      value={{
        formData,
        setFormData,
        paramData,
        setParamData,
        headerData,
        setHeaderData,
        jsonText,
        setJsonText,
        authData,
        setAuthData,
        history,
        addHistoryItem,
        clearHistory,
        removeHistoryItem,
        collections,
        setCollections,
        saveToCollection,
        removeCollectionItem,
        environments,
        setEnvironments,
        activeEnvId,
        setActiveEnvId,
        activeEnvironment,
        activeEnvVariables,
        loadRequest,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
