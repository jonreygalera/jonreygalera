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
      <Box
        className='bg-primary-950 text-yellow-400 sticky top-0 z-50 px-5'
      >
        # ONGOING
      </Box>
      <Box className='ml-32 mr-10 '>
        { children }
      </Box>
      {/* <Box
        className='bg-red-500'
      >
        Footer
      </Box> */}
    </Box>
  );
}

export default OutletLayout;
