import React, { useContext, useState } from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputAdornment,
  IconButton
} from '@mui/material';
import { DataContext } from '../context/DataProvider';
import { ShieldIcon, KeyIcon } from './Icons';

const AuthTab = () => {
  const { authData, setAuthData } = useContext(DataContext);
  const [showPassword, setShowPassword] = useState(false);

  const handleTypeChange = (e) => {
    setAuthData({ ...authData, type: e.target.value });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, color: 'var(--text-secondary)', width: 90 }}>
          Type:
        </Typography>
        <Select
          size="small"
          value={authData.type || 'none'}
          onChange={handleTypeChange}
          sx={{
            minWidth: 200,
            backgroundColor: 'var(--bg-input)',
            fontSize: '13px',
            fontWeight: 600,
          }}
        >
          <MenuItem value="none">No Auth</MenuItem>
          <MenuItem value="bearer">Bearer Token</MenuItem>
          <MenuItem value="basic">Basic Auth</MenuItem>
          <MenuItem value="apikey">API Key</MenuItem>
        </Select>
      </Box>

      {/* No Auth */}
      {(!authData.type || authData.type === 'none') && (
        <Box sx={{ p: 3, border: '1px dashed var(--border-color)', borderRadius: '8px', textAlign: 'center', color: 'var(--text-muted)' }}>
          <ShieldIcon size={24} style={{ marginBottom: 8, opacity: 0.5 }} />
          <Typography variant="body2" sx={{ fontSize: '13px' }}>
            This request does not use any authorization.
          </Typography>
          <Typography variant="caption">
            Select a type above to inject Bearer tokens, Basic credentials, or API Keys.
          </Typography>
        </Box>
      )}

      {/* Bearer Token */}
      {authData.type === 'bearer' && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, p: 2, backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)' }}>
            Bearer Token
          </Typography>
          <Typography variant="caption" sx={{ color: 'var(--text-muted)' }}>
            Will be added to the request headers as <code style={{ color: 'var(--accent-color)' }}>Authorization: Bearer &lt;token&gt;</code>
          </Typography>
          <TextField
            size="small"
            placeholder="Paste JWT, API access token, or {{apiToken}}"
            value={authData.token || ''}
            onChange={(e) => setAuthData({ ...authData, token: e.target.value })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <KeyIcon size={14} color="var(--accent-color)" />
                </InputAdornment>
              ),
              style: { fontFamily: 'var(--font-mono)', fontSize: '13px' },
            }}
            fullWidth
          />
        </Box>
      )}

      {/* Basic Auth */}
      {authData.type === 'basic' && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2, backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)' }}>
            Basic Authentication
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
            <TextField
              size="small"
              label="Username"
              value={authData.username || ''}
              onChange={(e) => setAuthData({ ...authData, username: e.target.value })}
              fullWidth
            />
            <TextField
              size="small"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={authData.password || ''}
              onChange={(e) => setAuthData({ ...authData, password: e.target.value })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                      sx={{ color: 'var(--text-muted)' }}
                    >
                      <Typography variant="caption" sx={{ fontSize: '11px', fontWeight: 600 }}>
                        {showPassword ? 'Hide' : 'Show'}
                      </Typography>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
          </Box>
        </Box>
      )}

      {/* API Key */}
      {authData.type === 'apikey' && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2, backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)' }}>
            API Key
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
            <TextField
              size="small"
              label="Key"
              placeholder="e.g. X-API-KEY"
              value={authData.key || ''}
              onChange={(e) => setAuthData({ ...authData, key: e.target.value })}
              fullWidth
            />
            <TextField
              size="small"
              label="Value"
              placeholder="e.g. secret_token_123"
              value={authData.value || ''}
              onChange={(e) => setAuthData({ ...authData, value: e.target.value })}
              fullWidth
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="caption" sx={{ fontWeight: 600, color: 'var(--text-muted)' }}>
              Add to:
            </Typography>
            <RadioGroup
              row
              value={authData.addTo || 'header'}
              onChange={(e) => setAuthData({ ...authData, addTo: e.target.value })}
            >
              <FormControlLabel value="header" control={<Radio size="small" />} label={<Typography variant="caption">Header</Typography>} />
              <FormControlLabel value="query" control={<Radio size="small" />} label={<Typography variant="caption">Query Params</Typography>} />
            </RadioGroup>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AuthTab;
