import { MouseEventHandler, ReactNode } from 'react';
import { CustomButton } from './styled';

interface ButtonProps {
  onClick?: MouseEventHandler;
  children?: ReactNode | ReactNode[];
}

function Button({ onClick, children }: ButtonProps) {
  return <CustomButton onClick={onClick}>{children}</CustomButton>;
}

export default Button;
