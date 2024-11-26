import React from 'react';
import Box from '../box/Box';
import INavigationProps from '../../interface/INavigationProps';
import { tailwindUtil } from '../../utils/tailwindUtil';

const Navigation: React.FC<INavigationProps> = (props) => {
  const { children, className } = props;

  return (
    <Box 
      className={
        tailwindUtil(
          "fixed top-12 flex flex-col gap-9 px-2.5 py-5 bg-primary-950 border-primary-500 border-r-2 border-y-2 border-solid rounded-full",
          className
        )
      }>
      { children }
    </Box>
  );
}

export default React.memo(Navigation);
