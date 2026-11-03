import React, { useState, useContext } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  TextField,
  IconButton,
  Chip,
  Tabs,
  Tab
} from '@mui/material';
import { VariableIcon, PlusIcon, TrashIcon, CheckIcon } from './Icons';
import { DataContext } from '../context/DataProvider';

const EnvironmentModal = ({ open, onClose }) => {
  const { environments, setEnvironments, activeEnvId, setActiveEnvId } = useContext(DataContext);
  const [selectedEnvIndex, setSelectedEnvIndex] = useState(0);

  const currentEnv = environments[selectedEnvIndex] || environments[0] || null;

  const handleUpdateEnv = (updatedEnv) => {
    const updated = [...environments];
    updated[selectedEnvIndex] = updatedEnv;
    setEnvironments(updated);
  };

  const handleAddVariable = () => {
    if (!currentEnv) return;
    const updatedVars = [
      ...(currentEnv.variables || []),
      { id: Date.now(), check: true, key: '', value: '' }
    ];
    handleUpdateEnv({ ...currentEnv, variables: updatedVars });
  };

  const handleVarChange = (index, field, val) => {
    if (!currentEnv) return;
    const updatedVars = [...(currentEnv.variables || [])];
    updatedVars[index] = { ...updatedVars[index], [field]: val };
    handleUpdateEnv({ ...currentEnv, variables: updatedVars });
  };

  const handleDeleteVar = (index) => {
    if (!currentEnv) return;
    const updatedVars = (currentEnv.variables || []).filter((_, i) => i !== index);
    handleUpdateEnv({ ...currentEnv, variables: updatedVars });
  };

  const handleAddEnvironment = () => {
    const newEnv = {
      id: 'env-' + Date.now(),
      name: `Environment ${environments.length + 1}`,
      variables: [
        { id: 0, check: true, key: '', value: '' }
      ]
    };
    setEnvironments([...environments, newEnv]);
    setSelectedEnvIndex(environments.length);
    if (!activeEnvId) {
      setActiveEnvId(newEnv.id);
    }
  };

  const handleDeleteEnvironment = () => {
    if (!currentEnv) return;
    const updated = environments.filter((_, idx) => idx !== selectedEnvIndex);
    setEnvironments(updated);
    if (activeEnvId === currentEnv.id) {
      setActiveEnvId(updated[0]?.id || '');
    }
    setSelectedEnvIndex(0);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: 'var(--bg-secondary)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          boxShadow: 'var(--card-shadow)',
        },
      }}
    >
      <DialogTitle sx={{ borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ p: 0.8, borderRadius: '8px', background: 'var(--accent-subtle)', color: 'var(--accent-color)', display: 'flex' }}>
            <VariableIcon size={20} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '17px', lineHeight: 1.2 }}>
              Environment Variables
            </Typography>
            <Typography variant="caption" sx={{ color: 'var(--text-secondary)' }}>
              Define reusable variables with <code style={{ color: 'var(--accent-color)' }}>{'{{variable}}'}</code> syntax
            </Typography>
          </Box>
        </Box>
        <Button
          size="small"
          startIcon={<PlusIcon size={14} />}
          onClick={handleAddEnvironment}
          sx={{ border: '1px solid var(--border-color)', color: 'var(--text-primary)', textTransform: 'none', fontSize: '12px' }}
        >
          New Environment
        </Button>
      </DialogTitle>

      <DialogContent sx={{ pt: 2, minHeight: '340px' }}>
        {environments.length === 0 ? (
          <Box sx={{ p: 6, textAlign: 'center', color: 'var(--text-muted)' }}>
            <Typography variant="body1" sx={{ fontWeight: 600, mb: 1, color: 'var(--text-primary)' }}>
              No Environments Configured
            </Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
              Create an environment to organize and switch between variable sets.
            </Typography>
            <Button
              variant="contained"
              size="small"
              startIcon={<PlusIcon size={14} />}
              onClick={handleAddEnvironment}
              sx={{ background: 'var(--accent-gradient)', color: '#fff' }}
            >
              Create Environment
            </Button>
          </Box>
        ) : (
          <>
            {/* Environment Tabs */}
            <Box sx={{ borderBottom: '1px solid var(--border-color)', mb: 3 }}>
              <Tabs
                value={selectedEnvIndex}
                onChange={(_, val) => setSelectedEnvIndex(val)}
                sx={{
                  '& .MuiTab-root': {
                    color: 'var(--text-secondary)',
                    fontWeight: 600,
                    fontSize: '13px',
                    '&.Mui-selected': {
                      color: 'var(--accent-color)',
                    },
                  },
                }}
              >
                {environments.map((env) => (
                  <Tab
                    key={env.id}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <span>{env.name}</span>
                        {activeEnvId === env.id && (
                          <Chip label="Active" size="small" sx={{ height: 18, fontSize: '10px', background: 'var(--accent-subtle)', color: 'var(--accent-color)', fontWeight: 700 }} />
                        )}
                      </Box>
                    }
                  />
                ))}
              </Tabs>
            </Box>

            {/* Variables Table */}
            {currentEnv && (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <TextField
                    size="small"
                    value={currentEnv.name || ''}
                    onChange={(e) => handleUpdateEnv({ ...currentEnv, name: e.target.value })}
                    placeholder="Environment Name"
                    sx={{
                      width: 240,
                      backgroundColor: 'var(--bg-input)',
                      '& .MuiInputBase-input': { fontWeight: 600, fontSize: '14px' }
                    }}
                  />

                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    {activeEnvId !== currentEnv.id ? (
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<CheckIcon size={14} />}
                        onClick={() => setActiveEnvId(currentEnv.id)}
                        sx={{ textTransform: 'none', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                      >
                        Set as Active
                      </Button>
                    ) : (
                      <Chip
                        label="Active Environment"
                        size="small"
                        color="success"
                        variant="outlined"
                        sx={{ fontWeight: 600 }}
                      />
                    )}
                    <Button
                      size="small"
                      startIcon={<PlusIcon size={14} />}
                      onClick={handleAddVariable}
                      sx={{ background: 'var(--accent-subtle)', color: 'var(--accent-color)', textTransform: 'none', fontWeight: 600 }}
                    >
                      Add Variable
                    </Button>
                    <IconButton
                      size="small"
                      onClick={handleDeleteEnvironment}
                      sx={{ color: 'var(--text-muted)', '&:hover': { color: 'var(--method-delete)' } }}
                    >
                      <TrashIcon size={14} />
                    </IconButton>
                  </Box>
                </Box>

                <Box sx={{ border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden' }}>
                  <Box sx={{ display: 'grid', gridTemplateColumns: '40px 1fr 1fr 40px', backgroundColor: 'var(--bg-tertiary)', p: 1, borderBottom: '1px solid var(--border-color)', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>
                    <Box></Box>
                    <Box>VARIABLE</Box>
                    <Box>VALUE</Box>
                    <Box></Box>
                  </Box>

                  {(currentEnv.variables || []).length === 0 ? (
                    <Box sx={{ p: 4, textAlign: 'center', color: 'var(--text-muted)' }}>
                      No variables in this environment yet. Click "+ Add Variable" to define one.
                    </Box>
                  ) : (
                    currentEnv.variables.map((v, idx) => (
                      <Box
                        key={v.id || idx}
                        sx={{
                          display: 'grid',
                          gridTemplateColumns: '40px 1fr 1fr 40px',
                          alignItems: 'center',
                          p: 0.8,
                          borderBottom: idx === currentEnv.variables.length - 1 ? 'none' : '1px solid var(--border-color)',
                          '&:hover': { backgroundColor: 'var(--bg-tertiary)' },
                        }}
                      >
                        <Box sx={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px' }}>
                          {idx + 1}
                        </Box>
                        <Box sx={{ pr: 1 }}>
                          <TextField
                            variant="standard"
                            placeholder="Variable key"
                            value={v.key || ''}
                            onChange={(e) => handleVarChange(idx, 'key', e.target.value)}
                            InputProps={{ disableUnderline: true, style: { fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-primary)' } }}
                            fullWidth
                          />
                        </Box>
                        <Box sx={{ pr: 1 }}>
                          <TextField
                            variant="standard"
                            placeholder="Value"
                            value={v.value || ''}
                            onChange={(e) => handleVarChange(idx, 'value', e.target.value)}
                            InputProps={{ disableUnderline: true, style: { fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-primary)' } }}
                            fullWidth
                          />
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                          <IconButton size="small" onClick={() => handleDeleteVar(idx)} sx={{ color: 'var(--text-muted)', '&:hover': { color: 'var(--method-delete)' } }}>
                            <TrashIcon size={14} />
                          </IconButton>
                        </Box>
                      </Box>
                    ))
                  )}
                </Box>
              </>
            )}
          </>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2, borderTop: '1px solid var(--border-color)' }}>
        <Button onClick={onClose} variant="contained" sx={{ background: 'var(--accent-gradient)', color: '#fff', px: 3 }}>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EnvironmentModal;
