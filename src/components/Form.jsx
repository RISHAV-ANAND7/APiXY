import React, { useContext, useState } from 'react';
import {
  Box,
  Select,
  MenuItem,
  TextField,
  Button,
  IconButton,
  Tooltip,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography
} from '@mui/material';
import { DataContext } from '../context/DataProvider';
import { SendIcon, CopyIcon, BookmarkIcon, CloseIcon, CheckIcon } from './Icons';
import { generateCurl } from '../utils/curlParser';

const HTTP_METHODS = [
  { value: 'GET', color: 'var(--method-get)' },
  { value: 'POST', color: 'var(--method-post)' },
  { value: 'PUT', color: 'var(--method-put)' },
  { value: 'PATCH', color: 'var(--method-patch)' },
  { value: 'DELETE', color: 'var(--method-delete)' },
  { value: 'OPTIONS', color: 'var(--text-muted)' },
  { value: 'HEAD', color: 'var(--text-muted)' },
];

const Form = ({ onSendClick, isLoading }) => {
  const {
    formData,
    setFormData,
    paramData,
    headerData,
    jsonText,
    saveToCollection
  } = useContext(DataContext);

  const [copiedCurl, setCopiedCurl] = useState(false);
  const [saveOpen, setSaveOpen] = useState(false);
  const [saveName, setSaveName] = useState('');
  const [saveGroup, setSaveGroup] = useState('My APIs');

  const currentMethodColor = HTTP_METHODS.find((m) => m.value === formData.type)?.color || 'var(--text-primary)';

  const handleCopyCurl = () => {
    const curl = generateCurl(formData.type, formData.url, headerData, paramData, jsonText);
    navigator.clipboard.writeText(curl);
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
  };

  const handleSaveSubmit = () => {
    saveToCollection(saveName.trim() || `${formData.type} ${formData.url}`, saveGroup.trim());
    setSaveOpen(false);
    setSaveName('');
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'stretch',
          gap: 1.5,
          p: 1.5,
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: '12px',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--card-shadow)',
        }}
      >
        {/* Method & URL Combined Group */}
        <Box
          sx={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            backgroundColor: 'var(--bg-input)',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            overflow: 'hidden',
            transition: 'border-color 0.2s, box-shadow 0.2s',
            '&:focus-within': {
              borderColor: 'var(--accent-color)',
              boxShadow: '0 0 0 2px var(--accent-subtle)',
            },
          }}
        >
          {/* Method Select */}
          <Select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            variant="standard"
            disableUnderline
            sx={{
              minWidth: 110,
              height: 44,
              px: 1.5,
              fontWeight: 800,
              fontSize: '13.5px',
              fontFamily: 'var(--font-mono)',
              color: currentMethodColor,
              borderRight: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-tertiary)',
              '& .MuiSelect-select': {
                display: 'flex',
                alignItems: 'center',
                py: 0,
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  boxShadow: 'var(--card-shadow)',
                  borderRadius: '8px',
                },
              },
            }}
          >
            {HTTP_METHODS.map((method) => (
              <MenuItem
                key={method.value}
                value={method.value}
                sx={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: method.color,
                }}
              >
                {method.value}
              </MenuItem>
            ))}
          </Select>

          {/* URL Input */}
          <TextField
            fullWidth
            variant="standard"
            placeholder="Enter URL or paste snippet (e.g. {{baseUrl}}/posts)"
            value={formData.url || ''}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                onSendClick();
              }
            }}
            InputProps={{
              disableUnderline: true,
              style: {
                padding: '0 14px',
                fontFamily: 'var(--font-mono)',
                fontSize: '13.5px',
                color: 'var(--text-primary)',
                height: 44,
              },
              endAdornment: formData.url ? (
                <IconButton
                  size="small"
                  onClick={() => setFormData({ ...formData, url: '' })}
                  sx={{ color: 'var(--text-muted)', mr: 0.5 }}
                >
                  <CloseIcon size={14} />
                </IconButton>
              ) : null,
            }}
          />
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title={copiedCurl ? "cURL Copied!" : "Copy as cURL"}>
            <Button
              variant="outlined"
              onClick={handleCopyCurl}
              sx={{
                height: 44,
                px: 1.8,
                borderColor: 'var(--border-color)',
                color: copiedCurl ? 'var(--method-get)' : 'var(--text-secondary)',
                backgroundColor: 'var(--bg-tertiary)',
                minWidth: 'auto',
                '&:hover': {
                  borderColor: 'var(--border-active)',
                  backgroundColor: 'var(--bg-elevated)',
                },
              }}
            >
              {copiedCurl ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
              <Box component="span" sx={{ ml: 1, display: { xs: 'none', lg: 'inline' }, fontSize: '13px' }}>
                {copiedCurl ? 'Copied' : 'cURL'}
              </Box>
            </Button>
          </Tooltip>

          <Tooltip title="Save to Collection">
            <Button
              variant="outlined"
              onClick={() => {
                setSaveName(`${formData.type} ${formData.url.substring(0, 35)}`);
                setSaveOpen(true);
              }}
              sx={{
                height: 44,
                px: 1.8,
                borderColor: 'var(--border-color)',
                color: 'var(--text-secondary)',
                backgroundColor: 'var(--bg-tertiary)',
                minWidth: 'auto',
                '&:hover': {
                  borderColor: 'var(--border-active)',
                  backgroundColor: 'var(--bg-elevated)',
                },
              }}
            >
              <BookmarkIcon size={16} />
              <Box component="span" sx={{ ml: 1, display: { xs: 'none', lg: 'inline' }, fontSize: '13px' }}>
                Save
              </Box>
            </Button>
          </Tooltip>

          {/* SEND BUTTON */}
          <Button
            variant="contained"
            disabled={isLoading}
            onClick={onSendClick}
            endIcon={
              isLoading ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                <SendIcon size={16} />
              )
            }
            sx={{
              height: 44,
              px: { xs: 3, md: 4 },
              fontWeight: 700,
              fontSize: '14px',
              letterSpacing: '0.02em',
              background: 'var(--accent-gradient)',
              color: '#ffffff',
              boxShadow: 'var(--glow-shadow)',
              '&:hover': {
                filter: 'brightness(1.1)',
                boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)',
              },
            }}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </Box>
      </Box>

      {/* Save to Collection Dialog */}
      <Dialog
        open={saveOpen}
        onClose={() => setSaveOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: '16px' }}>Save Request to Collection</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <TextField
            label="Request Name"
            size="small"
            value={saveName}
            onChange={(e) => setSaveName(e.target.value)}
            fullWidth
            sx={{ mt: 1 }}
          />
          <TextField
            label="Collection / Group"
            size="small"
            value={saveGroup}
            onChange={(e) => setSaveGroup(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setSaveOpen(false)} sx={{ color: 'var(--text-secondary)' }}>
            Cancel
          </Button>
          <Button onClick={handleSaveSubmit} variant="contained" sx={{ background: 'var(--accent-gradient)' }}>
            Save Request
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Form;
