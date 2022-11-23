import styled from '@emotion/styled';

import { ReactComponent as LeftArrowSVG } from 'icons/left_arrow.svg';

export const Container = styled.main`
  width: 100%;
`;

export const LeftArrow = styled(LeftArrowSVG)`
  position: absolute;
  top: 2%;
  left: 2%;
  width: 24px;
  height: 24px;
  color: ${(props) => props.theme.colors.grey600};

  & path {
    fill: ${(props) => props.theme.colors.primary};
  }
`;

export const AmountContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Img = styled.img`
  width: 100%;
  object-fit: cover;
`;

export const MenuInfoContainer = styled.section`
  margin: 10% 5%;

  & > h2,
  & > .price {
    font-size: ${(props) => props.theme.font.size.lg};
  }

  & > .description {
    margin: 15px 0;
    color: ${(props) => props.theme.colors.grey600};
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 0 20px 0;
`;
