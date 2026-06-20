import { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { ThemeModeContext } from '../context/ThemeModeContext';

const Response = ({ data, time, status }) => {
  const { mode } = useContext(ThemeModeContext);
  const readableResponse = data && Object.keys(data).length > 0 ? JSON.stringify(data, null, 2) : "";

  const getStatusColor = (code) => {
    if (!code) return 'default';
    if (code >= 200 && code < 300) return 'success';
    if (code >= 400 && code < 500) return 'warning';
    if (code >= 500) return 'error';
    return 'default';
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="subtitle2" sx={{ color: 'var(--text-secondary)', fontWeight: 600 }}>
          Response
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {status && (
            <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
              Status: <Typography component="span" color={getStatusColor(status) + '.main'} sx={{ fontWeight: 600 }}>{status}</Typography>
            </Typography>
          )}
          {time && (
            <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
              Time: <Typography component="span" sx={{ color: '#10b981', fontWeight: 600 }}>{time} ms</Typography>
            </Typography>
          )}
        </Box>
      </Box>

      <Box sx={{ 
        border: '1px solid var(--border-color)', 
        borderRadius: '8px', 
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        '& .cm-editor': {
          fontFamily: 'monospace',
          fontSize: '14px',
          height: '100%'
        },
        '& .cm-scroller': {
          overflow: 'auto'
        }
      }}>
        <CodeMirror
          value={readableResponse}
          height="100%"
          minHeight="350px"
          theme={mode === 'dark' ? vscodeDark : 'light'}
          extensions={[json()]}
          editable={false}
          basicSetup={{
            lineNumbers: true,
            foldGutter: true,
            highlightActiveLine: false,
          }}
        />
      </Box>
    </Box>
  );
};

export default Response;