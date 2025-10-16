import { useContext } from 'react'
import {Box,Select,MenuItem, TextField, Button} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { DataContext } from '../context/DataProvider';

const useStyles= makeStyles({
component:{

  display:'flex',
  alignItems:'center',
  justifyContent:'space-between',
  gap:'12px',
},

  Select:{
    width:150,
    height:40
  },

  TextField:{
    width:'100%',
    background:'#f6f6f6'
  },

  Button:{
    height:40,
    width:100,
  }
})

const Form = ({onSendClick}) => {
  const classes = useStyles();

  const { formData, setFormData } = useContext(DataContext);

  const handleChange = (e) => {
    setFormData({ ...formData, type: e.target.value });
  };

  const onUrlChange = (e) => {
    setFormData({ ...formData, url: e.target.value });
  };

  return (
    <Box className={classes.component}>
           <Select
    value={formData.type}
    label="POST"
    onChange={(e)=>handleChange(e)}
    className={classes.Select}
  >
    <MenuItem value={"POST"}>POST</MenuItem>
    <MenuItem value={"GET"}>GET</MenuItem>
  </Select>
  <TextField
    size="small"
    className={classes.TextField}
    onChange={(e) => onUrlChange(e)}
  />
  <Button className={classes.Button}
  variant='contained'
   onClick={()=> onSendClick()}
  >
    Send
  </Button>
    </Box>
  )
}

export default Form