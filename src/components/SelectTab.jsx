import { useState, useContext } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { makeStyles } from '@mui/styles';

//components
import CreateTable from './CreateTable';
import CreateJsonText from './CreateJsonText';

import { DataContext } from '../context/DataProvider';  
const useStyles = makeStyles({
  component: {
  marginTop:16
  },
  tab: {
    textTransform: 'none',
    fontWeight: 400,
    fontSize: 14,
  },

})

const SelectTab = () => {

  const classes= useStyles();
  const {paramData, setParamData, headerData, setHeaderData} = useContext(DataContext);
  
const [value, setValue] = useState(0);
  const handleChange=(event, newValue)=>{
    setValue(newValue);
  }
  return (
    <Box className={classes.component}>
       <Tabs value={value} onChange={handleChange} 
       TabIndicatorProps={{ sx: { background: "#5def23ff", height:4, bottom:2 } }}
       textColor='none'
       >
    <Tab label="Params" className={classes.tab}  />
    <Tab label="Header" className={classes.tab} />
    <Tab label="Body" className={classes.tab}  />
  </Tabs>
   <Box
      role="tabpanel"
      hidden={value !== 0}
      id={`simple-tabpanel-${0}`}
      aria-labelledby={`simple-tab-${0}`}
    
    >
      <CreateTable text={"Query Param"} data={paramData}  setData={setParamData}  />
    </Box>
    <Box
      role="tabpanel"
      hidden={value !== 1}
      id={`simple-tabpanel-${1}`}
      aria-labelledby={`simple-tab-${1}`}
    
    >
      <CreateTable text={"Header"} data={headerData} setData={setHeaderData } />
    </Box>
    <Box
      role="tabpanel"
      hidden={value !== 2}
      id={`simple-tabpanel-${2}`}
      aria-labelledby={`simple-tab-${2}`}
    
    >
      <CreateJsonText />
    </Box>
    </Box>
  )
}

export default SelectTab