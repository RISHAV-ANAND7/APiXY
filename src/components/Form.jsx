import { useContext } from 'react'
import { Box, Select, MenuItem, TextField, Button, InputAdornment, SvgIcon } from '@mui/material'
import { DataContext } from '../context/DataProvider';

const SendIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </SvgIcon>
);

const Form = ({ onSendClick }) => {
  const { formData, setFormData } = useContext(DataContext);

  const handleChange = (e) => {
    setFormData({ ...formData, type: e.target.value });
  };

  const onUrlChange = (e) => {
    setFormData({ ...formData, url: e.target.value });
  };

  // Determine the color of the HTTP method text based on the method
  const getMethodColor = (method) => {
    switch (method) {
      case 'GET': return '#2563eb';
      case 'POST': return '#10b981';
      case 'PUT': return '#f59e0b';
      case 'DELETE': return '#ef4444';
      case 'PATCH': return '#8b5cf6';
      default: return 'var(--text-primary)';
    }
  }

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
    }}>
      <Select
        value={formData.type}
        onChange={(e) => handleChange(e)}
        sx={{
          width: 130,
          height: 48,
          backgroundColor: 'var(--bg-tertiary)',
          color: getMethodColor(formData.type),
          fontWeight: 700,
          '& .MuiSelect-select': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              bgcolor: 'var(--bg-tertiary)',
              '& .MuiMenuItem-root': {
                fontWeight: 600,
              }
            }
          }
        }}
      >
        <MenuItem value={"GET"} sx={{ color: '#2563eb' }}>GET</MenuItem>
        <MenuItem value={"POST"} sx={{ color: '#10b981' }}>POST</MenuItem>
        <MenuItem value={"PUT"} sx={{ color: '#f59e0b' }}>PUT</MenuItem>
        <MenuItem value={"DELETE"} sx={{ color: '#ef4444' }}>DELETE</MenuItem>
        <MenuItem value={"PATCH"} sx={{ color: '#8b5cf6' }}>PATCH</MenuItem>
        <MenuItem value={"OPTIONS"} sx={{ color: '#6b7280' }}>OPTIONS</MenuItem>
      </Select>
      
      <TextField
        size="medium"
        placeholder="Enter request URL"
        value={formData.url || ''}
        onChange={(e) => onUrlChange(e)}
        sx={{
          flex: 1,
          backgroundColor: 'var(--bg-primary)',
          borderRadius: 1,
          '& .MuiOutlinedInput-root': {
            height: 48,
          },
          '& .MuiInputBase-input': {
            fontFamily: 'monospace',
            fontSize: '15px'
          }
        }}
      />
      
      <Button 
        variant='contained'
        onClick={() => onSendClick()}
        endIcon={<SendIcon />}
        sx={{
          height: 48,
          px: 4,
          fontWeight: 600,
          fontSize: '15px',
          backgroundColor: 'var(--accent-color)',
          '&:hover': {
            backgroundColor: 'var(--accent-hover)',
          }
        }}
      >
        Send
      </Button>
    </Box>
  )
}

export default Form;