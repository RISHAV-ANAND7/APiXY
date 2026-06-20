import { useContext } from 'react';
import { AppBar, Toolbar, Typography, Box, SvgIcon, IconButton } from '@mui/material';
import { ThemeModeContext } from '../context/ThemeModeContext';
import Logo from '../assets/Logo.png';

const CodeIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
  </SvgIcon>
);

const SunIcon = (props) => (
  <SvgIcon {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </SvgIcon>
);

const MoonIcon = (props) => (
  <SvgIcon {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </SvgIcon>
);

const Header = () => {
  const { mode, toggleTheme } = useContext(ThemeModeContext);

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{
        backgroundColor: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border-color)',
        padding: '0 24px',
        transition: 'background-color 0.3s ease, border-color 0.3s ease'
      }}
    >
      <Toolbar sx={{ minHeight: '64px', padding: '0 !important', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Logo element */}
          <Box 
            component="img"
            src={Logo}
            alt="Apixy Logo"
            sx={{
              height: 32,
              objectFit: 'contain',
              filter: mode === 'dark' ? 'invert(1) brightness(2)' : 'none',
              transition: 'filter 0.3s ease'
            }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <CodeIcon sx={{ color: 'var(--accent-color)', display: 'none' }} id="fallback-icon" />
          <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 1, color: 'var(--text-primary)' }}>
            APIXY <Box component="span" sx={{ color: 'var(--accent-color)' }}>STUDIO</Box>
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={toggleTheme} sx={{ color: 'var(--text-primary)' }} aria-label="Toggle Theme">
            {mode === 'dark' ? <SunIcon /> : <MoonIcon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;