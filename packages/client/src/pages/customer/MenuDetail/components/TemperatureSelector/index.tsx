import { Container } from './styled';
import { Temperature } from '@/types';
import { memo } from 'react';
import { useMenuDetailDispatch } from '@/stores/MenuDetail';

interface Props {
  temperature: Temperature;
}

function TemperatureSelector({ temperature }: Props) {
  const dispatch = useMenuDetailDispatch();

  /**
   * 음료 타입(핫, 아이스) 선택에 따라 음료 타입 변경
   */
  const handleClickTemperature = (event: React.MouseEvent<HTMLSpanElement>) => {
    const newType = event.currentTarget.className;

    if (newType !== 'hot' && newType !== 'iced') return;
    dispatch({ type: 'SET_TEMPERATURE', temperature: newType });
  };

  return (
    <Container selected={temperature}>
      <span className="hot" onClick={handleClickTemperature}>
        HOT
      </span>
      <span className="iced" onClick={handleClickTemperature}>
        ICED
      </span>
    </Container>
  );
}

export default memo(TemperatureSelector);
