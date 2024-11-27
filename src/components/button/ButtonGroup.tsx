import React, { Children } from 'react';
import Box from '../box/Box';
import IButtonGroupProps from '../../interface/IButtonGroupProps';
import Button from './Button';
import { tailwindUtil } from '../../utils/tailwindUtil';

const ButtonGroup: React.FC<IButtonGroupProps> = (props) => {
  const { children, max = 3 } = props;
  const childrenArray = Children.toArray(children);
  const childrenContainer = [...childrenArray].splice(0, max);
  const childLength = childrenContainer.length;
  const childLastIndex = childLength - 1;

  return (
    <Box className="inline-flex " role="group">
      { 
        childrenContainer.map((child: any, childIdx) => {
          let cornerClass = 'border-x-0';

          if(childIdx == 0 && childLength > 1) {
            cornerClass = 'rounded-s-lg';
          } else if(childIdx != 0 && childIdx == childLastIndex) {
            cornerClass = 'rounded-e-lg';
          } else if (childLength == 1) {
            cornerClass = 'rounded-lg';
          }

          return (<Box>
            {
              React.cloneElement(child, {
                className: tailwindUtil(cornerClass, 'border bg-primary-50')
              })
            }
          </Box>)
        })
      
      }
      <Button className="rounded-full m-1 border-none">{'>'}</Button>
    </Box>
  );
}

export default ButtonGroup;
