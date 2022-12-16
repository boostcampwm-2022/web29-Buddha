import styled from '@emotion/styled';

export const Container = styled.section`
  margin: 5%;
  margin-bottom: 100px;
`;

export const Title = styled.p`
  font-size: ${({theme}) => theme.font.size.lg};
`;

export const CategoryContainer = styled.div`
  padding: 0.6rem 0;
`;

export const CategoryTitle = styled.p`
  font-size: ${({theme}) => theme.font.size.md};
  font-weight: ${({theme}) => theme.font.weight.bold500};
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0.6rem 0;
  border-bottom: 1px solid ${({theme}) => theme.colors.grey400};
`;

export const OptionItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({theme}) => theme.font.size.sm};

  & > div {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  & > div > label {
    margin: 5% 0;
  }
`;
