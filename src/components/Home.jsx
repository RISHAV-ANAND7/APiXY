import { useContext, useState } from 'react';
import {Box} from '@mui/material';
import { makeStyles } from '@mui/styles';
import Header from './Header';
import Form from './Form';
import SelectTab from './SelectTab';
import Response from './Response';
import ErrorScreen from './ErrorScreen';
import SnackBar from './SnackBar';
import { getData } from '../service/api';
import './home.css';


import DataProvider, {DataContext} from '../context/DataProvider';
import { checkParams } from '../utils/commonutils';

const useStyles = makeStyles({
  component: {
    width: '60%',
    margin: '20px auto 0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
 
    
  },
});
 
const Home = () => {
  const classes = useStyles();
const [error, setError]= useState(false);
const [errorMsg, setErrorMsg]=useState("");
const [errorResponse, setErrorResponse]=useState(false);
const [apiResponse, setApiResponse]=useState({});

const {formData, jsonText, paramData, headerData}= useContext(DataContext);

const onSendClick= async()=>{
 if(!checkParams(formData, jsonText, paramData, headerData, setErrorMsg)){
  setError(true);
  return false;
 }
let response= await getData(formData, jsonText, paramData, headerData);

if(response==="error"){
 setErrorResponse(true)
  return;
}
setErrorResponse(false)
setApiResponse(response.data);
}
  return (
    <>
    <div className="background">
          <Header/>

    <Box className={classes.component}>
        <Form onSendClick={onSendClick}/>
        <SelectTab/>
      
       { errorResponse ? <ErrorScreen /> : <Response data={apiResponse} /> }
    </Box>
     { error && <SnackBar errorMsg={errorMsg} error={error} setError={setError} /> }
     </div>
    </>
  )
}

export default Home;