import React, { useContext, useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  IconButton,
  Tooltip,
  Chip,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@mui/material';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';

import { ThemeModeContext } from '../context/ThemeModeContext';
import {
  CopyIcon,
  CheckIcon,
  DownloadIcon,
  ClockIcon,
  ZapIcon,
  TerminalIcon,
  LayersIcon,
  FileTextIcon
} from './Icons';
import { formatBytes } from '../utils/commonutils';

const Response = ({ data, time, status, statusText, headers, size, onClear }) => {
  const { mode } = useContext(ThemeModeContext);
  const [activeTab, setActiveTab] = useState(0); // 0 = Pretty, 1 = Raw, 2 = Headers, 3 = Overview
  const [copied, setCopied] = useState(false);

  const readableResponse =
    data !== undefined && data !== null
      ? typeof data === 'object'
        ? JSON.stringify(data, null, 2)
        : String(data)
      : '';

  const handleCopy = () => {
    if (!readableResponse) return;
    navigator.clipboard.writeText(readableResponse);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!readableResponse) return;
    const blob = new Blob([readableResponse], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `response_${status || 'data'}_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Determine status color theme
  const isSuccess = status >= 200 && status < 300;
  const isRedirect = status >= 300 && status < 400;
  const isClientError = status >= 400 && status < 500;

  const statusBg = isSuccess
    ? 'var(--method-get-bg)'
    : isClientError || isRedirect
    ? 'var(--method-put-bg)'
    : 'var(--method-delete-bg)';

  const statusColor = isSuccess
    ? 'var(--method-get)'
    : isClientError || isRedirect
    ? 'var(--method-put)'
    : 'var(--method-delete)';

  const responseHeadersList = headers
    ? Object.entries(headers).map(([k, v]) => ({ key: k, value: Array.isArray(v) ? v.join(', ') : String(v) }))
    : [];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%' }}>
      {/* Response Header Status Bar */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1.5,
          pb: 1.5,
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        {/* Status code badge & metrics */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
          {status ? (
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.8,
                px: 1.2,
                py: 0.4,
                borderRadius: '6px',
                background: statusBg,
                color: statusColor,
                fontFamily: 'var(--font-mono)',
                fontWeight: 800,
                fontSize: '13px',
                border: `1px solid ${statusColor}33`,
              }}
            >
              <span>{status}</span>
              <span>{statusText || ''}</span>
            </Box>
          ) : (
            <Typography variant="subtitle2" sx={{ color: 'var(--text-secondary)', fontWeight: 700, fontSize: '13px' }}>
              Response
            </Typography>
          )}

          {time !== null && time !== undefined && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.6,
                px: 1,
                py: 0.3,
                borderRadius: '6px',
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-secondary)',
                fontSize: '12px',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <ClockIcon size={12} color="var(--accent-color)" />
              <span>{time} ms</span>
            </Box>
          )}

          {size > 0 && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.6,
                px: 1,
                py: 0.3,
                borderRadius: '6px',
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-secondary)',
                fontSize: '12px',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <span>{formatBytes(size)}</span>
            </Box>
          )}
        </Box>

        {/* Toolbar Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title={copied ? 'Copied to clipboard!' : 'Copy response body'}>
            <Button
              size="small"
              onClick={handleCopy}
              startIcon={copied ? <CheckIcon size={13} /> : <CopyIcon size={13} />}
              sx={{
                fontSize: '12px',
                color: copied ? 'var(--method-get)' : 'var(--text-secondary)',
                backgroundColor: 'var(--bg-tertiary)',
                textTransform: 'none',
                height: 30,
                '&:hover': { backgroundColor: 'var(--bg-elevated)' },
              }}
            >
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </Tooltip>

          <Tooltip title="Download as JSON file">
            <Button
              size="small"
              onClick={handleDownload}
              startIcon={<DownloadIcon size={13} />}
              sx={{
                fontSize: '12px',
                color: 'var(--text-secondary)',
                backgroundColor: 'var(--bg-tertiary)',
                textTransform: 'none',
                height: 30,
                '&:hover': { backgroundColor: 'var(--bg-elevated)' },
              }}
            >
              Download
            </Button>
          </Tooltip>

          {onClear && (
            <Button
              size="small"
              onClick={onClear}
              sx={{
                fontSize: '12px',
                color: 'var(--text-muted)',
                textTransform: 'none',
                height: 30,
                '&:hover': { color: 'var(--method-delete)' },
              }}
            >
              Clear
            </Button>
          )}
        </Box>
      </Box>

      {/* View Switcher Tabs */}
      <Box sx={{ borderBottom: '1px solid var(--border-color)', mt: 1 }}>
        <Tabs
          value={activeTab}
          onChange={(_, val) => setActiveTab(val)}
          TabIndicatorProps={{
            sx: {
              background: 'var(--accent-gradient)',
              height: 2.5,
              borderRadius: '2px 2px 0 0',
            },
          }}
          textColor="inherit"
          sx={{
            minHeight: '34px',
            '& .MuiTab-root': {
              minHeight: '34px',
              fontSize: '12.5px',
              fontWeight: 600,
              textTransform: 'none',
              color: 'var(--text-muted)',
              px: 1.5,
              '&.Mui-selected': {
                color: 'var(--text-primary)',
              },
            },
          }}
        >
          <Tab label="Pretty (JSON)" />
          <Tab label="Raw Text" />
          <Tab label={`Headers (${responseHeadersList.length})`} />
        </Tabs>
      </Box>

      {/* Main Tab Panels */}
      <Box sx={{ flex: 1, mt: 1.5, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        {/* Tab 0: Pretty View (CodeMirror) */}
        {activeTab === 0 && (
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
                fontSize: '13px',
                height: '100%',
                minHeight: '340px',
              },
              '& .cm-scroller': {
                overflow: 'auto',
              },
            }}
          >
            <CodeMirror
              value={readableResponse}
              height="100%"
              minHeight="340px"
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
        )}

        {/* Tab 1: Raw Text View */}
        {activeTab === 1 && (
          <Box
            sx={{
              p: 2,
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              backgroundColor: 'var(--bg-input)',
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              overflow: 'auto',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all',
              flex: 1,
              minHeight: '340px',
              color: 'var(--text-primary)',
              lineHeight: 1.6,
            }}
          >
            {readableResponse || '<Empty Response>'}
          </Box>
        )}

        {/* Tab 2: Response Headers */}
        {activeTab === 2 && (
          <Box
            sx={{
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: 'var(--bg-input)',
              flex: 1,
              overflowY: 'auto',
              maxHeight: '440px',
            }}
          >
            {responseHeadersList.length === 0 ? (
              <Box sx={{ p: 4, textAlign: 'center', color: 'var(--text-muted)' }}>
                No response headers available.
              </Box>
            ) : (
              <Table size="small">
                <TableHead sx={{ backgroundColor: 'var(--bg-tertiary)' }}>
                  <TableRow>
                    <TableCell sx={{ color: 'var(--text-muted)', fontWeight: 700, fontSize: '11px', width: '35%' }}>HEADER</TableCell>
                    <TableCell sx={{ color: 'var(--text-muted)', fontWeight: 700, fontSize: '11px' }}>VALUE</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {responseHeadersList.map((h, i) => (
                    <TableRow key={i} sx={{ '&:hover': { backgroundColor: 'var(--bg-tertiary)' } }}>
                      <TableCell sx={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {h.key}
                      </TableCell>
                      <TableCell sx={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-secondary)', wordBreak: 'break-all' }}>
                        {h.value}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Response;
