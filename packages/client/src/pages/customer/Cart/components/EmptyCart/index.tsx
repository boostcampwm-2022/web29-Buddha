import Button from 'components/Button';
import { useNavigate } from 'react-router-dom';
import { EmptyCartWrapper } from './styled';

function EmptyCart() {
  const navigate = useNavigate();

  const handleClickMenu = () => {
    navigate('/menu');
  };

  return (
    <EmptyCartWrapper>
      <p className={'empty-title'}>장바구니가 비어있습니다.</p>
      <p className={'description'}>
        원하는 메뉴를 장바구니에 담고 한번에 주문해보세요.
      </p>
      <Button className={'wd-fit'} onClick={handleClickMenu}>
        메뉴 담으러 가기
      </Button>
    </EmptyCartWrapper>
  );
}

export default EmptyCart;
