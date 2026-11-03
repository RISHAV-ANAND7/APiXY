import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Alert
} from '@mui/material';
import { TerminalIcon } from './Icons';
import { parseCurl } from '../utils/curlParser';

const CurlModal = ({ open, onClose, onImport }) => {
  const [curlText, setCurlText] = useState('');
  const [error, setError] = useState('');

  const handleImport = () => {
    if (!curlText.trim()) {
      setError('Please enter a valid cURL command');
      return;
    }

    const parsed = parseCurl(curlText);
    if (!parsed || !parsed.url) {
      setError('Could not parse cURL command. Make sure it contains a valid URL.');
      return;
    }

    onImport(parsed);
    setCurlText('');
    setError('');
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: 'var(--bg-secondary)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          boxShadow: 'var(--card-shadow)',
        },
      }}
    >
      <DialogTitle sx={{ borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: 1.5, pb: 2 }}>
        <Box sx={{ p: 0.8, borderRadius: '8px', background: 'var(--accent-subtle)', color: 'var(--accent-color)', display: 'flex' }}>
          <TerminalIcon size={20} />
        </Box>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '17px', lineHeight: 1.2 }}>
            Import from cURL
          </Typography>
          <Typography variant="caption" sx={{ color: 'var(--text-secondary)' }}>
            Paste any cURL request to auto-populate method, URL, headers, and body
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: '8px' }}>
            {error}
          </Alert>
        )}

        <TextField
          multiline
          rows={7}
          fullWidth
          placeholder="curl --request POST 'https://api.example.com/endpoint' --header 'Content-Type: application/json' --data '{...}'"
          value={curlText}
          onChange={(e) => {
            setCurlText(e.target.value);
            if (error) setError('');
          }}
          sx={{
            mt: 1,
            backgroundColor: 'var(--bg-input)',
            '& .MuiInputBase-input': {
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              color: 'var(--text-primary)',
            },
          }}
        />

        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Typography variant="caption" sx={{ color: 'var(--text-muted)' }}>
            Supports -X, -H, -d, --data-raw, and query parameters
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2.5, borderTop: '1px solid var(--border-color)' }}>
        <Button onClick={onClose} sx={{ color: 'var(--text-secondary)' }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleImport}
          sx={{
            background: 'var(--accent-gradient)',
            color: '#fff',
            px: 3,
            '&:hover': {
              background: 'var(--accent-hover)',
            },
          }}
        >
          Import Request
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CurlModal;
