import { MouseEventHandler, ReactNode } from 'react';
import { CustomButton } from './styled';

interface ButtonProps {
  onClick?: MouseEventHandler;
  children?: ReactNode | ReactNode[];
  className?: string;
}

function Button({ onClick, children, className }: ButtonProps) {
  return (
    <CustomButton onClick={onClick} className={className}>
      {children}
    </CustomButton>
  );
}

export default Button;
