import { Box, Typography, TextareaAutosize } from '@mui/material';

const textareaStyle = {
  width: "100%",
  padding: 10,
  background: `url(http://i.imgur.com/2cOaJ.png)`,
  backgroundAttachment: "local",
  backgroundRepeat: "no-repeat",
  paddingLeft: 35,
  paddingTop: 10,
  borderColor: "#ccc"
};


const Response = ({ data }) => {
  const readableResponse = JSON.stringify(data, null, 2);

  return (
    <Box>
      <Typography mt={2} mb={2}>Response</Typography>
      <TextareaAutosize
        minRows={7}
        maxRows={10}
        style={textareaStyle}
        disabled="disabled"
        value={readableResponse}
        
      />
    </Box>
  );
};

export default Response;