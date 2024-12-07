// src/RedirectPage.tsx

import React, { useEffect } from 'react';
import Box from '../components/box/Box';
import Typography from '../components/typography/Typography';

const RedirectPage: React.FC = () => {

  useEffect(() => {
    // Redirect after 3 seconds
    const timer = setTimeout(() => {
      window.location.href = ('http://jonreygalera.mreys.net'); // Replace with your desired URL
    }, 3000);

    return () => clearTimeout(timer); // Clean up on unmount
  }, []);

  return (
    <Box className="flex justify-center items-center h-screen bg-gray-100">
      <Box className="text-center p-6 border rounded-md bg-white shadow-md">
        <Typography variant='h2'>Please wait. You are redirecting to a new URL.</Typography>
        <Typography className="mt-4 text-gray-500">This page will redirect in a few seconds...</Typography>
      </Box>
    </Box>
  );
};

export default RedirectPage;
