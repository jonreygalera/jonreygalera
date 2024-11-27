import React from 'react';
import IIconButtonProps from '../../interface/IIconButtonProps';
import Button from '../button/Button';
import Typography from '../typography/Typography';
import { tailwindUtil } from '../../utils/tailwindUtil';

const IconButton: React.FC<IIconButtonProps> = (props) => {
  const { 
    icon, 
    IconComponentProps,
    ButtonComponentProps,
    onClick,
    label,
    active = false 
  } = props;

  return (
    <Button 
      onClick={onClick} 
      {...ButtonComponentProps}
      className={tailwindUtil(
        'flex flex-col items-center min-w-11 min-h-11 p-2.5 rounded-xl', 
        ButtonComponentProps?.className, 
        // active ? 'border-b-2 border-solid border-primary-50 ' : ''
      )}
    >
      {
        React.createElement(icon, {
          ...IconComponentProps, 
          className: tailwindUtil(IconComponentProps?.className, "size-7", active ? 'text-primary-50 size-8' : 'text-primary-500')
        })
      }
      {/* { label && <Typography className={active ? 'text-primary-950' : 'text-primary-500'}>{label}</Typography>} */}
    </Button>
  );
}

export default IconButton;
