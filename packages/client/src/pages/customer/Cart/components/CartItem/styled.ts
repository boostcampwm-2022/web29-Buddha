import styled from '@emotion/styled';
import { ReactComponent as DeleteButtonSVG } from 'icons/x_icon.svg';

export const CartItemWrapper = styled.li`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
  position: relative;
  width: 100%;
  padding: 1rem 1rem 1rem 1rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.grey200};
`;

export const MenuImg = styled.img`
  width: 4rem;
  border-radius: 50%;
`;

export const MenuInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;

  p {
    font-size: ${(props) => props.theme.font.size.sm};
  }

  p.menu-name {
    margin-right: 0.8rem;
  }
`;

export const OptionPriceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  p {
    font-size: ${(props) => props.theme.font.size.xs};
    color: ${(props) => props.theme.colors.grey400};
  }
`;

export const MenuOptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CountWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  p {
    font-weight: ${(props) => props.theme.font.weight.bold700};
  }
`;

export const DeleteButton = styled(DeleteButtonSVG)`
  position: absolute;
  top: 0.4rem;
  right: 0.4rem;
  width: 1rem;
  height: 1rem;
`;
