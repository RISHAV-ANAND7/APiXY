import { useState, useEffect, useMemo } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { ThemeModeContext } from './ThemeContext';

export { ThemeModeContext };

export const ThemeModeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    try {
      return localStorage.getItem('apixy_theme_v2') || 'light';
    } catch {
      return 'light';
    }
  });

  const toggleTheme = () => {
    setMode((prevMode) => {
      const next = prevMode === 'light' ? 'dark' : 'light';
      try {
        localStorage.setItem('apixy_theme_v2', next);
      } catch (e) {
        console.warn(e);
      }
      return next;
    });
  };

  useEffect(() => {
    document.body.className = mode === 'dark' ? 'dark-mode' : 'light-mode';
  }, [mode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'dark'
            ? {
                background: {
                  default: '#090a0f',
                  paper: '#11131a',
                },
                primary: {
                  main: '#6366f1',
                },
                text: {
                  primary: '#f1f5f9',
                  secondary: '#94a3b8',
                },
                divider: '#1e2230',
              }
            : {
                background: {
                  default: '#ffffff',
                  paper: '#ffffff',
                },
                primary: {
                  main: '#4f46e5',
                },
                text: {
                  primary: '#0f172a',
                  secondary: '#475569',
                },
                divider: '#e2e8f0',
              }),
        },
        typography: {
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          button: {
            textTransform: 'none',
            fontWeight: 600,
          },
        },
        shape: {
          borderRadius: 8,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                boxShadow: 'none',
                textTransform: 'none',
                fontWeight: 600,
                letterSpacing: '0.01em',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)',
                },
              },
            },
          },
          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                transition: 'all 0.2s ease',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: mode === 'dark' ? '#222634' : '#e2e8f0',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: mode === 'dark' ? '#3b4257' : '#cbd5e1',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#6366f1',
                  borderWidth: '1.5px',
                },
              },
            },
          },
          MuiTab: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '13px',
                minHeight: '38px',
                letterSpacing: '0.02em',
                borderRadius: '6px',
                padding: '6px 14px',
              },
            },
          },
          MuiTableCell: {
            styleOverrides: {
              root: {
                borderColor: mode === 'dark' ? '#1e2230' : '#f1f5f9',
                padding: '8px 12px',
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeModeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};
