import React, { useContext } from 'react';
import { Typography, Box, Button, Tooltip } from '@mui/material';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';

import { DataContext } from '../context/DataProvider';
import { ThemeModeContext } from '../context/ThemeModeContext';
import { WandIcon, TrashIcon } from './Icons';

const CreateJsonText = () => {
  const { jsonText, setJsonText } = useContext(DataContext);
  const { mode } = useContext(ThemeModeContext);

  const handleFormatJson = () => {
    if (!jsonText || !jsonText.trim()) return;
    try {
      const parsed = JSON.parse(jsonText);
      setJsonText(JSON.stringify(parsed, null, 2));
    } catch {
      // invalid JSON, ignore format
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 1 }}>
      {/* Editor Toolbar */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="subtitle2" sx={{ color: 'var(--text-secondary)', fontWeight: 700, fontSize: '13px' }}>
          JSON Body (raw)
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title="Format / Beautify JSON">
            <Button
              size="small"
              onClick={handleFormatJson}
              startIcon={<WandIcon size={13} />}
              sx={{
                color: 'var(--accent-color)',
                backgroundColor: 'var(--accent-subtle)',
                fontSize: '12px',
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': { filter: 'brightness(1.1)' },
              }}
            >
              Beautify
            </Button>
          </Tooltip>

          {jsonText && (
            <Button
              size="small"
              onClick={() => setJsonText('')}
              startIcon={<TrashIcon size={12} />}
              sx={{
                color: 'var(--text-muted)',
                fontSize: '12px',
                textTransform: 'none',
                '&:hover': { color: 'var(--method-delete)' },
              }}
            >
              Clear
            </Button>
          )}
        </Box>
      </Box>

      {/* Editor Container */}
      <Box
        sx={{
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          overflow: 'hidden',
          backgroundColor: 'var(--bg-input)',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          '& .cm-editor': {
            fontFamily: 'var(--font-mono)',
            fontSize: '13.5px',
            minHeight: '260px',
            height: '100%',
          },
          '& .cm-scroller': {
            overflow: 'auto',
          },
        }}
      >
        <CodeMirror
          value={jsonText || ''}
          height="100%"
          minHeight="260px"
          theme={mode === 'dark' ? vscodeDark : 'light'}
          extensions={[json()]}
          onChange={(val) => setJsonText(val)}
          placeholder='{\n  "key": "value"\n}'
          basicSetup={{
            lineNumbers: true,
            foldGutter: true,
            highlightActiveLine: true,
            tabSize: 2,
          }}
        />
      </Box>
    </Box>
  );
};

export default CreateJsonText;
