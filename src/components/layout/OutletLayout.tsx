import React, { PropsWithChildren } from 'react';
import Box from '../box/Box';

interface Props {

}

const OutletLayout: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;
  return (
    <Box
      className="ml-32 h-screen"
    >
      { children }
    </Box>
  );
}

export default OutletLayout;
