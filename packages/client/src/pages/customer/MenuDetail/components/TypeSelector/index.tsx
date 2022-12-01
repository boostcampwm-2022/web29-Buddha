import { Container } from './styled';
import { Temperature } from '@/types';
import { memo } from 'react';

interface Props {
  type: Temperature;
  onClick: (event: React.MouseEvent<HTMLSpanElement>) => void;
}

function TypeSelector({ type, onClick }: Props) {
  return (
    <Container selected={type}>
      <span className="hot" onClick={onClick}>
        HOT
      </span>
      <span className="iced" onClick={onClick}>
        ICED
      </span>
    </Container>
  );
}

export default memo(TypeSelector);
