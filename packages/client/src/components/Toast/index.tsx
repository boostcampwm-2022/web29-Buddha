import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';

import { toastMessageState } from '@/stores';
import { Container } from './styled';

function Toast() {
  const [toastMessage, setToastMessage] = useRecoilState(toastMessageState);
  const timer = useRef<any>(null);

  useEffect(() => {
    timer.current = setTimeout(() => setToastMessage(''), 2000);

    return () => {
      clearTimeout(timer.current);
    };
  });

  return <>{toastMessage !== '' && <Container>{toastMessage}</Container>}</>;
}

export default Toast;
