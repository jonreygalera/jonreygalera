import React, { PropsWithChildren } from 'react';
import Box from '../box/Box';
import Typography from '../typography/Typography';

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
      <Box className='ml-32 mr-10 hidden laptop:block'>
        { children }
      </Box>
      <Box className='ml-32 mr-10 laptop:hidden flex items-center '>
        <Typography variant='h1'>Lower screen size | Ongoing</Typography>
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
