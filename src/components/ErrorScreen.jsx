import {Box, Typography} from '@mui/material';
import errorImg from '../assets/error.png';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  component: {
    width: '75%',
    height:"auto",
    margin:"auto",
    objectPosition:"center 0%"

  },
});

const ErrorScreen = () => {
  const classes = useStyles();
  return (

   <Box>
            <Typography mt={2} mb={2} >Response</Typography>
            <Box style={{ display: 'flex', justifyContent: 'center' }}>
                 <img src={errorImg} alt="error"  className={classes.component}
                 />
            </Box>
         </Box> 
          )
}

export default ErrorScreen