import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { AlertCircleIcon, RefreshCwIcon } from './Icons';

const ErrorScreen = ({ onRetry, errorDetails }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        minHeight: '360px',
        p: { xs: 2, md: 4 },
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          width: 52,
          height: 52,
          borderRadius: '50%',
          backgroundColor: 'var(--method-delete-bg)',
          color: 'var(--method-delete)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2,
          boxShadow: '0 0 20px rgba(239, 68, 68, 0.2)',
        }}
      >
        <AlertCircleIcon size={28} />
      </Box>

      <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '18px', color: 'var(--method-delete)', mb: 0.5 }}>
        Request Failed
      </Typography>

      <Typography variant="body2" sx={{ color: 'var(--text-secondary)', maxWidth: 440, mb: 3, fontSize: '13px' }}>
        {errorDetails || "The request could not be completed due to a network connection issue or CORS restrictions."}
      </Typography>

      {/* Troubleshooting card */}
      <Box
        sx={{
          p: 2,
          borderRadius: '10px',
          backgroundColor: 'var(--bg-input)',
          border: '1px solid var(--border-color)',
          maxWidth: 480,
          width: '100%',
          textAlign: 'left',
          mb: 3,
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '12px', color: 'var(--text-primary)', mb: 1 }}>
          COMMON CAUSES:
        </Typography>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          <li>
            <strong>CORS Policy:</strong> Server does not send cross-origin headers to allow browser requests.
          </li>
          <li>
            <strong>Endpoint Reachability:</strong> Check the URL protocol and hostname.
          </li>
          <li>
            <strong>Offline / Local Service:</strong> Ensure the target server is active and listening.
          </li>
        </ul>
      </Box>

      {onRetry && (
        <Button
          variant="outlined"
          size="small"
          onClick={onRetry}
          startIcon={<RefreshCwIcon size={14} />}
          sx={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
        >
          Retry Request
        </Button>
      )}
    </Box>
  );
};

export default ErrorScreen;
