import { MouseEventHandler, ReactNode } from 'react';
import { NavItem } from './styled';

interface NavigateItemProps {
  onClick: MouseEventHandler;
  children: ReactNode[];
  className: string;
}

function NavigateItem({ onClick, children, className }: NavigateItemProps) {
  return (
    <NavItem onClick={onClick} className={className}>
      {children}
    </NavItem>
  );
}

export default NavigateItem;
