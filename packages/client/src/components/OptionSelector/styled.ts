import styled from '@emotion/styled';

export const Container = styled.section`
  margin: 5%;
`;

export const Title = styled.p`
  font-size: ${(props) => props.theme.font.size.lg};
`;

export const CategoryContainer = styled.div`
  margin: 5% 0;
`;

export const CategoryTitle = styled.p`
  font-size: ${(props) => props.theme.font.size.md};
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 5% 0;
`;

export const OptionItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > div {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  & > div > label {
    margin: 5% 0;
  }
`;
