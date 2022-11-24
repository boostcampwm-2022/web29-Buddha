import styled from '@emotion/styled';

export const Container = styled.header`
  width: 100%;
  margin-bottom: 20px;
  padding: 15px;
  font-size: ${(props) => props.theme.font.size.lg};
  font-weight: ${(props) => props.theme.font.weight.bold700};
  border-bottom: ${(props) => props.theme.border.default};
  border-bottom-color: ${(props) => props.theme.colors.grey200};
`;
