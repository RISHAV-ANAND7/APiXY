import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Box, Typography, Button, Tooltip, IconButton } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import Form from './Form';
import SelectTab from './SelectTab';
import Response from './Response';
import ErrorScreen from './ErrorScreen';
import QuickStart from './QuickStart';
import SnackBar from './SnackBar';
import { getData } from '../service/api';
import './home.css';

import { DataContext } from '../context/DataProvider';
import { checkParams } from '../utils/commonutils';

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [errorResponse, setErrorResponse] = useState(false);
  const [errorDetails, setErrorDetails] = useState('');

  const [apiResponse, setApiResponse] = useState(null);
  const [responseTime, setResponseTime] = useState(null);
  const [responseStatus, setResponseStatus] = useState(null);
  const [responseStatusText, setResponseStatusText] = useState(null);
  const [responseHeaders, setResponseHeaders] = useState(null);
  const [responseSize, setResponseSize] = useState(0);

  const {
    formData,
    jsonText,
    paramData,
    headerData,
    authData,
    activeEnvVariables,
    addHistoryItem
  } = useContext(DataContext);

  const onSendClick = useCallback(async () => {
    if (!checkParams(formData, jsonText, setErrorMsg)) {
      setError(true);
      return false;
    }

    setIsLoading(true);
    setErrorResponse(false);

    try {
      const res = await getData(
        formData,
        jsonText,
        paramData,
        headerData,
        authData,
        activeEnvVariables
      );

      setIsLoading(false);

      if (res.error && res.status === 0) {
        setErrorResponse(true);
        setErrorDetails(res.errorMessage || 'Network connection failed or blocked by CORS');
        addHistoryItem({
          method: formData.type,
          url: formData.url,
          status: 0,
          statusText: 'Network Error',
          time: res.time,
          size: 0,
          paramData,
          headerData,
          jsonText,
          authData,
          responseSnapshot: res.data,
        });
        return;
      }

      setApiResponse(res.data);
      setResponseStatus(res.status);
      setResponseStatusText(res.statusText);
      setResponseTime(res.time);
      setResponseHeaders(res.headers);
      setResponseSize(res.size);

      addHistoryItem({
        method: formData.type,
        url: formData.url,
        status: res.status,
        statusText: res.statusText,
        time: res.time,
        size: res.size,
        paramData,
        headerData,
        jsonText,
        authData,
        responseSnapshot: res.data,
      });
    } catch (err) {
      setIsLoading(false);
      setErrorResponse(true);
      setErrorDetails(err.message || 'An unexpected error occurred');
    }
  }, [formData, jsonText, paramData, headerData, authData, activeEnvVariables, addHistoryItem]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl + Enter to send
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        onSendClick();
      }
      // Ctrl + B to toggle sidebar
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        setSidebarOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSendClick]);

  const handleClearResponse = () => {
    setApiResponse(null);
    setResponseStatus(null);
    setResponseStatusText(null);
    setResponseTime(null);
    setResponseHeaders(null);
    setResponseSize(0);
    setErrorResponse(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-primary)' }}>
      {/* Top Application Header */}
      <Header />

      {/* Main Studio Body: Sidebar + Editor Canvas */}
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left Sidebar */}
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen((prev) => !prev)} />

        {/* Workspace Canvas */}
        <Box
          component="main"
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            p: { xs: 2, md: 3 },
            gap: 2.5,
            maxWidth: '1800px',
            width: '100%',
            margin: '0 auto',
          }}
        >
          {/* Unified Address / Request Bar */}
          <Form onSendClick={onSendClick} isLoading={isLoading} />

          {/* Dual Column Workspace: Request Config (Left) + Response Viewer (Right) */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
              gap: 2.5,
              flex: 1,
              minHeight: '520px',
            }}
          >
            {/* Request Builder Box */}
            <Box
              sx={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                p: { xs: 2, sm: 2.5 },
                boxShadow: 'var(--card-shadow)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'border-color 0.2s',
              }}
            >
              <SelectTab />
            </Box>

            {/* Response Viewer Box */}
            <Box
              sx={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                p: { xs: 2, sm: 2.5 },
                boxShadow: 'var(--card-shadow)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'border-color 0.2s',
              }}
            >
              {errorResponse ? (
                <ErrorScreen
                  errorDetails={errorDetails}
                  onRetry={onSendClick}
                />
              ) : apiResponse !== null ? (
                <Response
                  data={apiResponse}
                  time={responseTime}
                  status={responseStatus}
                  statusText={responseStatusText}
                  headers={responseHeaders}
                  size={responseSize}
                  onClear={handleClearResponse}
                />
              ) : (
                <QuickStart />
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Notifications Snackbar */}
      {error && <SnackBar errorMsg={errorMsg} error={error} setError={setError} />}
    </Box>
  );
};

export default Home;
