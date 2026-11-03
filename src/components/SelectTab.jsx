import React, { useState, useContext } from 'react';
import { Box, Tabs, Tab, Badge } from '@mui/material';
import CreateTable from './CreateTable';
import CreateJsonText from './CreateJsonText';
import AuthTab from './AuthTab';
import { DataContext } from '../context/DataProvider';

const SelectTab = () => {
  const {
    paramData,
    setParamData,
    headerData,
    setHeaderData,
    jsonText,
    authData
  } = useContext(DataContext);

  const [tabIndex, setTabIndex] = useState(0);

  const activeParamsCount = (paramData || []).filter((p) => p.check && p.key).length;
  const activeHeadersCount = (headerData || []).filter((h) => h.check && h.key).length;
  const hasAuth = authData && authData.type && authData.type !== 'none';
  const hasBody = Boolean(jsonText && jsonText.trim().length > 0);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <Box sx={{ borderBottom: '1px solid var(--border-color)', mb: 2 }}>
        <Tabs
          value={tabIndex}
          onChange={(_, val) => setTabIndex(val)}
          TabIndicatorProps={{
            sx: {
              background: 'var(--accent-gradient)',
              height: 3,
              borderRadius: '3px 3px 0 0',
            },
          }}
          textColor="inherit"
          sx={{
            minHeight: '40px',
            '& .MuiTab-root': {
              minHeight: '40px',
              fontSize: '13px',
              fontWeight: 600,
              textTransform: 'none',
              color: 'var(--text-secondary)',
              px: 2,
              '&.Mui-selected': {
                color: 'var(--text-primary)',
              },
            },
          }}
        >
          <Tab
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                <span>Params</span>
                {activeParamsCount > 0 && (
                  <Box
                    component="span"
                    sx={{
                      px: 0.8,
                      py: 0.1,
                      fontSize: '10px',
                      borderRadius: '9999px',
                      backgroundColor: 'var(--accent-subtle)',
                      color: 'var(--accent-color)',
                      fontWeight: 700,
                    }}
                  >
                    {activeParamsCount}
                  </Box>
                )}
              </Box>
            }
          />
          <Tab
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                <span>Headers</span>
                {activeHeadersCount > 0 && (
                  <Box
                    component="span"
                    sx={{
                      px: 0.8,
                      py: 0.1,
                      fontSize: '10px',
                      borderRadius: '9999px',
                      backgroundColor: 'var(--accent-subtle)',
                      color: 'var(--accent-color)',
                      fontWeight: 700,
                    }}
                  >
                    {activeHeadersCount}
                  </Box>
                )}
              </Box>
            }
          />
          <Tab
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                <span>Auth</span>
                {hasAuth && (
                  <Box
                    component="span"
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      backgroundColor: 'var(--method-get)',
                    }}
                  />
                )}
              </Box>
            }
          />
          <Tab
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                <span>Body</span>
                {hasBody && (
                  <Box
                    component="span"
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent-color)',
                    }}
                  />
                )}
              </Box>
            }
          />
        </Tabs>
      </Box>

      {/* Tab Panels */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {tabIndex === 0 && (
          <CreateTable text="Query Parameters" data={paramData} setData={setParamData} />
        )}
        {tabIndex === 1 && (
          <CreateTable text="Request Headers" data={headerData} setData={setHeaderData} />
        )}
        {tabIndex === 2 && <AuthTab />}
        {tabIndex === 3 && <CreateJsonText />}
      </Box>
    </Box>
  );
};

export default SelectTab;
