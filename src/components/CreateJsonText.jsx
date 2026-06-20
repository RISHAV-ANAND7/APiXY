import { useContext } from "react";
import { Typography, Box } from "@mui/material";
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';

import { DataContext } from "../context/DataProvider";
import { ThemeModeContext } from "../context/ThemeModeContext";

const CreateJsonText = () => {
  const { jsonText, setJsonText } = useContext(DataContext);
  const { mode } = useContext(ThemeModeContext);

  const onValueChange = (val) => {
    setJsonText(val);
  }

  return (
    <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', flex: 1 }}>
      <Typography variant="subtitle2" sx={{ mb: 2, color: 'var(--text-secondary)', fontWeight: 600 }}>
        JSON Body
      </Typography>
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
          value={jsonText || ''}
          height="100%"
          minHeight="250px"
          theme={mode === 'dark' ? vscodeDark : 'light'}
          extensions={[json()]}
          onChange={onValueChange}
          basicSetup={{
            lineNumbers: true,
            foldGutter: true,
            highlightActiveLine: true,
            tabSize: 2,
          }}
        />
      </Box>
    </Box>
  )
}

export default CreateJsonText;