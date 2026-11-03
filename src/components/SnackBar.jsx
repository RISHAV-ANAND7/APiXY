import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const SnackBar = ({ errorMsg, error, setError }) => {
  const handleClose = (_, reason) => {
    if (reason === 'clickaway') return;
    setError(false);
  };

  return (
    <Snackbar
      open={error}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        onClose={handleClose}
        severity="error"
        variant="filled"
        sx={{
          width: '100%',
          borderRadius: '8px',
          fontWeight: 600,
          fontSize: '13px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
        }}
      >
        {errorMsg}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
