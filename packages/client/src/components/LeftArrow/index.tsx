import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { LeftArrowSVG } from './styled';

export interface Props {
  color: 'primary' | 'secondary' | 'tertiary' | 'fourth' | string;
  top: number;
  left: number;
  width?: number;
  height?: number;
}

function LeftArrow({ color, top, left, width = 1, height = 1 }: Props) {
  const navigate = useNavigate();

  const handleClickBack = useCallback(() => {
    // 뒤로가기, window.history.popState()
    navigate(-1);
  }, [navigate]);

  return (
    <LeftArrowSVG
      color={color}
      top={top}
      left={left}
      width={width}
      height={height}
      onClick={handleClickBack}
    />
  );
}

export default LeftArrow;
