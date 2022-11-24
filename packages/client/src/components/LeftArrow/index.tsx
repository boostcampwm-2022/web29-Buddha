import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { LeftArrowSVG } from './styled';

export interface Props {
  color: string;
  top: number;
  left: number;
  width: number;
  height: number;
}

function LeftArrow({ color, top, left, width, height }: Props) {
  const navigate = useNavigate();

  const handleClickBack = useCallback(() => {
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
