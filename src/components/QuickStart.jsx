import React from 'react';
import { Box, Typography } from '@mui/material';
import { TerminalIcon } from './Icons';

const QuickStart = () => {
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
          width: 48,
          height: 48,
          borderRadius: '12px',
          background: 'var(--bg-tertiary)',
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2,
          border: '1px solid var(--border-color)',
        }}
      >
        <TerminalIcon size={22} />
      </Box>

      <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '16px', mb: 0.5, color: 'var(--text-primary)' }}>
        No Response Yet
      </Typography>
      <Typography variant="body2" sx={{ color: 'var(--text-muted)', maxWidth: 360, fontSize: '13px', lineHeight: 1.5 }}>
        Enter a request URL above and click <strong style={{ color: 'var(--accent-color)' }}>Send</strong> to execute the API call and view its response.
      </Typography>
    </Box>
  );
};

export default QuickStart;
