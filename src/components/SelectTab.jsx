import { useState, useContext } from 'react';
import { Box, Tabs, Tab } from '@mui/material';

//components
import CreateTable from './CreateTable';
import CreateJsonText from './CreateJsonText';

import { DataContext } from '../context/DataProvider';  

const SelectTab = () => {
  const { paramData, setParamData, headerData, setHeaderData } = useContext(DataContext);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
    <Box sx={{ marginTop: 2 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'var(--border-color)' }}>
        <Tabs 
          value={value} 
          onChange={handleChange} 
          TabIndicatorProps={{ sx: { background: "var(--accent-color)", height: 3, borderTopLeftRadius: 3, borderTopRightRadius: 3 } }}
          textColor='inherit'
          sx={{
            minHeight: '40px',
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '14px',
              minHeight: '40px',
              color: 'var(--text-secondary)',
              '&.Mui-selected': {
                color: 'var(--text-primary)',
              }
            }
          }}
        >
          <Tab label="Params" />
          <Tab label="Headers" />
          <Tab label="Body" />
        </Tabs>
      </Box>
      <Box
        role="tabpanel"
        hidden={value !== 0}
        id={`simple-tabpanel-${0}`}
        sx={{ pt: 2 }}
      >
        <CreateTable text={"Query Parameters"} data={paramData} setData={setParamData} />
      </Box>
      <Box
        role="tabpanel"
        hidden={value !== 1}
        id={`simple-tabpanel-${1}`}
        sx={{ pt: 2 }}
      >
        <CreateTable text={"Headers"} data={headerData} setData={setHeaderData} />
      </Box>
      <Box
        role="tabpanel"
        hidden={value !== 2}
        id={`simple-tabpanel-${2}`}
        sx={{ pt: 2 }}
      >
        <CreateJsonText />
      </Box>
    </Box>
  )
}

export default SelectTab;