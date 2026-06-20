import { useContext, useState } from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Form from './Form';
import SelectTab from './SelectTab';
import Response from './Response';
import ErrorScreen from './ErrorScreen';
import SnackBar from './SnackBar';
import { getData } from '../service/api';
import './home.css';

import { DataContext } from '../context/DataProvider';
import { checkParams } from '../utils/commonutils';

const Home = () => {
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [errorResponse, setErrorResponse] = useState(false);
  const [apiResponse, setApiResponse] = useState({});
  const [responseTime, setResponseTime] = useState(null);
  const [responseStatus, setResponseStatus] = useState(null);

  const { formData, jsonText, paramData, headerData } = useContext(DataContext);

  const onSendClick = async () => {
    if (!checkParams(formData, jsonText, paramData, headerData, setErrorMsg)) {
      setError(true);
      return false;
    }
    
    // reset previous state
    setErrorResponse(false);
    setResponseTime(null);
    setResponseStatus(null);

    const startTime = new Date().getTime();
    let response = await getData(formData, jsonText, paramData, headerData);
    const endTime = new Date().getTime();
    
    setResponseTime(endTime - startTime);

    if (response === "error") {
      setErrorResponse(true);
      return;
    }
    
    if (response && response.status) {
       setResponseStatus(response.status);
    }

    setApiResponse(response.data);
  }

  return (
    <>
      <div className="background">
        <Header />
        {/* Full Viewport Workspace */}
        <Box sx={{
          width: '100%',
          maxWidth: '1600px',
          margin: '0 auto',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          flex: 1,
        }}>
          <Form onSendClick={onSendClick} />
          
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, 
            gap: 4,
            flex: 1
          }}>
            <Box sx={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <SelectTab />
            </Box>

            <Box sx={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {errorResponse ? <ErrorScreen /> : <Response data={apiResponse} time={responseTime} status={responseStatus} />}
            </Box>
          </Box>
        </Box>
        {error && <SnackBar errorMsg={errorMsg} error={error} setError={setError} />}
      </div>
    </>
  )
}

export default Home;