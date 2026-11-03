import React, { useState, useContext, useMemo } from 'react';
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Tabs,
  Tab,
  Button,
  Tooltip,
  Chip
} from '@mui/material';
import { DataContext } from '../context/DataProvider';
import {
  HistoryIcon,
  FolderIcon,
  VariableIcon,
  SearchIcon,
  TrashIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  ZapIcon
} from './Icons';

const Sidebar = ({ isOpen, onToggle }) => {
  const {
    history,
    clearHistory,
    removeHistoryItem,
    collections,
    removeCollectionItem,
    loadRequest,
    activeEnvironment,
    activeEnvVariables
  } = useContext(DataContext);

  const [activeTab, setActiveTab] = useState(0); // 0 = History, 1 = Collections, 2 = Variables
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered History
  const filteredHistory = useMemo(() => {
    if (!searchQuery.trim()) return history;
    const q = searchQuery.toLowerCase();
    return history.filter(
      (item) =>
        item.url.toLowerCase().includes(q) ||
        item.method.toLowerCase().includes(q) ||
        (item.status && item.status.toString().includes(q))
    );
  }, [history, searchQuery]);

  // Filtered Collections
  const filteredCollections = useMemo(() => {
    if (!searchQuery.trim()) return collections;
    const q = searchQuery.toLowerCase();
    return collections.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.url.toLowerCase().includes(q) ||
        item.method.toLowerCase().includes(q) ||
        (item.group && item.group.toLowerCase().includes(q))
    );
  }, [collections, searchQuery]);

  // Compute Metrics
  const metrics = useMemo(() => {
    if (history.length === 0) return { total: 0, avgTime: 0, successRate: 100 };
    const total = history.length;
    const totalTime = history.reduce((acc, h) => acc + (h.time || 0), 0);
    const avgTime = Math.round(totalTime / total);
    const successCount = history.filter((h) => h.status >= 200 && h.status < 400).length;
    const successRate = Math.round((successCount / total) * 100);
    return { total, avgTime, successRate };
  }, [history]);

  // Format relative timestamp
  const formatTimeAgo = (isoDate) => {
    if (!isoDate) return '';
    const diff = Math.floor((Date.now() - new Date(isoDate).getTime()) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  if (!isOpen) {
    return (
      <Box
        sx={{
          width: '48px',
          borderRight: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-secondary)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 2,
          gap: 2,
          flexShrink: 0,
        }}
      >
        <Tooltip title="Expand Sidebar" placement="right">
          <IconButton size="small" onClick={onToggle} sx={{ color: 'var(--text-secondary)' }}>
            <ChevronRightIcon size={18} />
          </IconButton>
        </Tooltip>
        <Tooltip title="History" placement="right">
          <IconButton size="small" onClick={() => { onToggle(); setActiveTab(0); }} sx={{ color: 'var(--text-secondary)' }}>
            <HistoryIcon size={18} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Collections" placement="right">
          <IconButton size="small" onClick={() => { onToggle(); setActiveTab(1); }} sx={{ color: 'var(--text-secondary)' }}>
            <FolderIcon size={18} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Variables" placement="right">
          <IconButton size="small" onClick={() => { onToggle(); setActiveTab(2); }} sx={{ color: 'var(--text-secondary)' }}>
            <VariableIcon size={18} />
          </IconButton>
        </Tooltip>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: { xs: '100%', sm: '300px', md: '320px' },
        borderRight: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-secondary)',
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 60px)',
        position: 'sticky',
        top: '60px',
        flexShrink: 0,
        zIndex: 100,
      }}
    >
      {/* Sidebar Header & Tabs */}
      <Box sx={{ borderBottom: '1px solid var(--border-color)', p: 1.5, pb: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)', letterSpacing: '0.02em' }}>
            EXPLORER
          </Typography>
          <Tooltip title="Collapse Sidebar">
            <IconButton size="small" onClick={onToggle} sx={{ color: 'var(--text-muted)' }}>
              <ChevronLeftIcon size={16} />
            </IconButton>
          </Tooltip>
        </Box>

        <Tabs
          value={activeTab}
          onChange={(_, val) => setActiveTab(val)}
          sx={{
            minHeight: '36px',
            '& .MuiTab-root': {
              minHeight: '36px',
              fontSize: '12px',
              fontWeight: 600,
              p: '6px 12px',
              color: 'var(--text-muted)',
              '&.Mui-selected': {
                color: 'var(--accent-color)',
              },
            },
          }}
        >
          <Tab label={`History (${history.length})`} />
          <Tab label={`Collections (${collections.length})`} />
          <Tab label="Variables" />
        </Tabs>
      </Box>

      {/* Search Input for items */}
      <Box sx={{ p: 1.5, borderBottom: '1px solid var(--border-subtle)' }}>
        <TextField
          size="small"
          placeholder="Search requests..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <Box sx={{ mr: 1, color: 'var(--text-muted)', display: 'flex' }}>
                <SearchIcon size={14} />
              </Box>
            ),
            style: { fontSize: '12.5px', height: '34px', backgroundColor: 'var(--bg-input)' },
          }}
          fullWidth
        />
      </Box>

      {/* Content Area */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: 1 }}>
        {/* Tab 0: History */}
        {activeTab === 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            {history.length > 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 1, py: 0.5 }}>
                <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontSize: '11px', fontWeight: 600 }}>
                  RECENT ACTIVITY
                </Typography>
                <Button
                  size="small"
                  onClick={clearHistory}
                  startIcon={<TrashIcon size={12} />}
                  sx={{ color: 'var(--text-muted)', fontSize: '11px', p: 0.5, textTransform: 'none', '&:hover': { color: 'var(--method-delete)' } }}
                >
                  Clear All
                </Button>
              </Box>
            )}

            {filteredHistory.length === 0 ? (
              <Box sx={{ p: 3, textAlign: 'center', color: 'var(--text-muted)' }}>
                <Typography variant="body2" sx={{ fontSize: '13px' }}>
                  {searchQuery ? 'No matching history items' : 'No requests yet'}
                </Typography>
                <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>
                  Sent requests will appear here automatically
                </Typography>
              </Box>
            ) : (
              filteredHistory.map((item) => {
                const isSuccess = item.status >= 200 && item.status < 400;
                return (
                  <Box
                    key={item.id}
                    onClick={() => {
                      if (item.requestSnapshot) {
                        loadRequest({
                          method: item.requestSnapshot.formData.type,
                          url: item.requestSnapshot.formData.url,
                          params: item.requestSnapshot.paramData,
                          headers: item.requestSnapshot.headerData,
                          body: item.requestSnapshot.jsonText,
                          auth: item.requestSnapshot.authData,
                        });
                      }
                    }}
                    sx={{
                      p: 1.2,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      border: '1px solid transparent',
                      transition: 'all 0.15s ease',
                      '&:hover': {
                        backgroundColor: 'var(--bg-tertiary)',
                        borderColor: 'var(--border-subtle)',
                        '& .delete-btn': { opacity: 1 },
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, overflow: 'hidden' }}>
                        <span className={`method-pill ${item.method}`}>{item.method}</span>
                        <Typography
                          variant="body2"
                          noWrap
                          sx={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '12px',
                            color: 'var(--text-primary)',
                            fontWeight: 500,
                          }}
                        >
                          {item.url.replace(/^https?:\/\//, '')}
                        </Typography>
                      </Box>
                      <IconButton
                        size="small"
                        className="delete-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeHistoryItem(item.id);
                        }}
                        sx={{ opacity: 0, p: 0.3, color: 'var(--text-muted)', '&:hover': { color: 'var(--method-delete)' } }}
                      >
                        <TrashIcon size={12} />
                      </IconButton>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 0.8, fontSize: '11px', color: 'var(--text-muted)' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {item.status ? (
                          <Chip
                            label={`${item.status}`}
                            size="small"
                            sx={{
                              height: 16,
                              fontSize: '10px',
                              fontWeight: 700,
                              background: isSuccess ? 'var(--method-get-bg)' : 'var(--method-delete-bg)',
                              color: isSuccess ? 'var(--method-get)' : 'var(--method-delete)',
                            }}
                          />
                        ) : null}
                        {item.time ? <span>{item.time}ms</span> : null}
                      </Box>
                      <span>{formatTimeAgo(item.timestamp)}</span>
                    </Box>
                  </Box>
                );
              })
            )}
          </Box>
        )}

        {/* Tab 1: Collections */}
        {activeTab === 1 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            {filteredCollections.length === 0 ? (
              <Box sx={{ p: 3, textAlign: 'center', color: 'var(--text-muted)' }}>
                <Typography variant="body2" sx={{ fontSize: '13px' }}>
                  No saved endpoints
                </Typography>
                <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>
                  Click "Save" beside the URL bar to save requests
                </Typography>
              </Box>
            ) : (
              filteredCollections.map((item) => (
                <Box
                  key={item.id}
                  onClick={() => loadRequest(item)}
                  sx={{
                    p: 1.2,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    border: '1px solid transparent',
                    transition: 'all 0.15s ease',
                    '&:hover': {
                      backgroundColor: 'var(--bg-tertiary)',
                      borderColor: 'var(--border-subtle)',
                      '& .delete-btn': { opacity: 1 },
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, overflow: 'hidden' }}>
                      <span className={`method-pill ${item.method}`}>{item.method}</span>
                      <Typography variant="body2" noWrap sx={{ fontWeight: 600, fontSize: '12.5px' }}>
                        {item.name}
                      </Typography>
                    </Box>
                    <IconButton
                      size="small"
                      className="delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeCollectionItem(item.id);
                      }}
                      sx={{ opacity: 0, p: 0.3, color: 'var(--text-muted)', '&:hover': { color: 'var(--method-delete)' } }}
                    >
                      <TrashIcon size={12} />
                    </IconButton>
                  </Box>
                  <Typography variant="caption" noWrap sx={{ display: 'block', mt: 0.5, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
                    {item.url}
                  </Typography>
                </Box>
              ))
            )}
          </Box>
        )}

        {/* Tab 2: Environment Variables */}
        {activeTab === 2 && (
          <Box sx={{ p: 1 }}>
            <Box sx={{ p: 1.5, borderRadius: '8px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', mb: 2 }}>
              <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 600 }}>
                ACTIVE ENVIRONMENT
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700, color: 'var(--accent-color)', mt: 0.2 }}>
                {activeEnvironment ? activeEnvironment.name : 'No Environment Selected'}
              </Typography>
            </Box>

            <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 700, px: 0.5 }}>
              VARIABLES IN SCOPE
            </Typography>

            <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
              {activeEnvVariables.length === 0 ? (
                <Typography variant="caption" sx={{ color: 'var(--text-muted)', p: 1 }}>
                  No variables defined in current environment.
                </Typography>
              ) : (
                activeEnvVariables.map((v, i) => (
                  <Box
                    key={v.id || i}
                    sx={{
                      p: 1,
                      borderRadius: '6px',
                      backgroundColor: 'var(--bg-input)',
                      border: '1px solid var(--border-color)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11.5px',
                    }}
                  >
                    <Box sx={{ color: 'var(--accent-color)', fontWeight: 600 }}>
                      {`{{${v.key}}}`}
                    </Box>
                    <Box sx={{ color: 'var(--text-secondary)', mt: 0.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {v.value || '<empty>'}
                    </Box>
                  </Box>
                ))
              )}
            </Box>
          </Box>
        )}
      </Box>

      {/* Sidebar Footer Stats Widget */}
      <Box sx={{ p: 1.5, borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)' }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1, textAlign: 'center' }}>
          <Box>
            <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontSize: '10px', fontWeight: 600 }}>
              REQUESTS
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '13px' }}>
              {metrics.total}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontSize: '10px', fontWeight: 600 }}>
              AVG LATENCY
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '13px', color: 'var(--method-get)' }}>
              {metrics.avgTime} ms
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontSize: '10px', fontWeight: 600 }}>
              SUCCESS
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '13px', color: 'var(--accent-color)' }}>
              {metrics.successRate}%
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;

