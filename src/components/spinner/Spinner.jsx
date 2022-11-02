import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'

const Spinner = () => {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'fixed',
      top:'0',
      bot: '0',
      right: '0',
      left: '0',
      zIndex: '5000',
      width: '100%',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }}>
    <CircularProgress color="secondary" size='3rem'/>
  </Box>
  );
}

export default Spinner