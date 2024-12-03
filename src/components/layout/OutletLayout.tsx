import React, { PropsWithChildren } from 'react';
import Box from '../box/Box';

interface Props {

}

const OutletLayout: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;
  return (
    <Box
      className="h-screen"
    >
      <Box className='ml-32 mr-10 '>
        { children }
      </Box>
      <Box
        className='bg-red-500'
      >
        Footer
      </Box>
    </Box>
  );
}

export default OutletLayout;
