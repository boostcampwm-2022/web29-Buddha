import styled from '@emotion/styled';

export const OrderStatusWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 0 3rem 0;
  flex: 1;

  p.reject {
    padding: 1rem 0 0 0;
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.font.size.lg};
    font-weight: ${({ theme }) => theme.font.weight.bold500};
  }
`;

export const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 2.5rem 0.5rem 1.5rem 0.5rem;

  p.title {
    font-size: ${(props) => props.theme.font.size.xl};
    font-weight: ${(props) => props.theme.font.weight.bold700};
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding: 1rem 0.5rem 0 0.5rem;
`;

export const StatusBar = styled.div`
  width: 100%;
  height: 0.3rem;
  border-radius: 0;
  background: ${(props) => props.theme.colors.tertiary};
`;

export const ProgressBar = styled.div`
  width: 5%;
  height: 100%;
  background: ${(props) => props.theme.colors.primary};

  &.wd-0 {
    width: 0;
  }

  &.wd-10 {
    width: 10%;
  }

  &.wd-50 {
    width: 50%;
  }

  &.wd-100 {
    width: 100%;
  }
`;

export const Progress = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 0.5rem 0 0 0;

  p {
    font-size: ${(props) => props.theme.font.size.sm};
    font-weight: ${(props) => props.theme.font.weight.bold500};
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex: 1;
`;

export const OrderInformationContainer = styled.div`
  padding: 1rem 1rem;
  margin: 0 0.5rem;
  border-radius: 10px;
  font-size: ${({ theme }) => theme.font.size.sm};
  background-color: ${({ theme }) => theme.colors.fourth};
`;

export const OrderInformationText = styled.p`
  padding: 0.5rem 0 0 0;
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.bold700};
`;
