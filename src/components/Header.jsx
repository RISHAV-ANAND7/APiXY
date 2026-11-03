import React, { useContext, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Tooltip,
  Chip
} from '@mui/material';
import { ThemeModeContext } from '../context/ThemeModeContext';
import { DataContext } from '../context/DataProvider';
import {
  SunIcon,
  MoonIcon,
  TerminalIcon,
  VariableIcon,
  ChevronDownIcon
} from './Icons';
import CurlModal from './CurlModal';
import EnvironmentModal from './EnvironmentModal';

const Header = () => {
  const { mode, toggleTheme } = useContext(ThemeModeContext);
  const { environments, activeEnvId, setActiveEnvId, loadRequest } = useContext(DataContext);

  const [curlOpen, setCurlOpen] = useState(false);
  const [envOpen, setEnvOpen] = useState(false);
  const [envAnchor, setEnvAnchor] = useState(null);

  const activeEnv = environments.find((e) => e.id === activeEnvId);

  const handleImportCurl = (parsed) => {
    loadRequest(parsed);
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-color)',
          backdropFilter: 'blur(12px)',
          zIndex: 1100,
          transition: 'all 0.25s ease',
        }}
      >
        <Toolbar sx={{ minHeight: '56px', px: { xs: 2, md: 3 }, justifyContent: 'space-between', gap: 2 }}>
          {/* Minimalist Brand Typography */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                fontSize: '17px',
                letterSpacing: '0.06em',
                color: 'var(--text-primary)',
                userSelect: 'none',
              }}
            >
              APIXY
            </Typography>
          </Box>

          {/* Actions & Environment Bar */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5 } }}>
            {/* Environment Switcher */}
            <Button
              size="small"
              onClick={(e) => setEnvAnchor(e.currentTarget)}
              startIcon={<VariableIcon size={14} color="var(--accent-color)" />}
              endIcon={<ChevronDownIcon size={13} />}
              sx={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                fontSize: '12px',
                fontWeight: 600,
                px: 1.5,
                height: 34,
                '&:hover': {
                  borderColor: 'var(--accent-color)',
                },
              }}
            >
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' }, mr: 0.5, color: 'var(--text-muted)' }}>Env:</Box>
              {activeEnv ? activeEnv.name : 'No Environment'}
            </Button>

            <Menu
              anchorEl={envAnchor}
              open={Boolean(envAnchor)}
              onClose={() => setEnvAnchor(null)}
              PaperProps={{
                sx: {
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  borderRadius: '10px',
                  boxShadow: 'var(--card-shadow)',
                  minWidth: 200,
                },
              }}
            >
              <Box sx={{ px: 2, py: 1, fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>
                ACTIVE ENVIRONMENT
              </Box>
              {environments.length === 0 ? (
                <MenuItem disabled sx={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  No environments configured
                </MenuItem>
              ) : (
                environments.map((env) => (
                  <MenuItem
                    key={env.id}
                    selected={activeEnvId === env.id}
                    onClick={() => {
                      setActiveEnvId(env.id);
                      setEnvAnchor(null);
                    }}
                    sx={{ fontSize: '13px', fontWeight: 500, display: 'flex', justifyContent: 'space-between' }}
                  >
                    {env.name}
                    {activeEnvId === env.id && <Chip label="Selected" size="small" sx={{ height: 18, fontSize: '10px', background: 'var(--accent-subtle)', color: 'var(--accent-color)' }} />}
                  </MenuItem>
                ))
              )}
              <MenuItem
                onClick={() => {
                  setEnvAnchor(null);
                  setEnvOpen(true);
                }}
                sx={{ borderTop: '1px solid var(--border-color)', fontSize: '12px', color: 'var(--accent-color)', fontWeight: 600 }}
              >
                + Manage Environments...
              </MenuItem>
            </Menu>

            {/* Import cURL Button */}
            <Tooltip title="Import cURL command">
              <Button
                size="small"
                onClick={() => setCurlOpen(true)}
                startIcon={<TerminalIcon size={14} />}
                sx={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: '12px',
                  fontWeight: 600,
                  px: 1.5,
                  height: 34,
                  '&:hover': {
                    borderColor: 'var(--border-active)',
                  },
                }}
              >
                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>cURL</Box>
              </Button>
            </Tooltip>

            {/* Theme Toggle */}
            <Tooltip title={mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
              <IconButton
                size="small"
                onClick={toggleTheme}
                sx={{
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  width: 34,
                  height: 34,
                  '&:hover': {
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                  },
                }}
              >
                {mode === 'dark' ? <SunIcon size={16} /> : <MoonIcon size={16} />}
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Modals */}
      <CurlModal open={curlOpen} onClose={() => setCurlOpen(false)} onImport={handleImportCurl} />
      <EnvironmentModal open={envOpen} onClose={() => setEnvOpen(false)} />
    </>
  );
};

export default Header;
