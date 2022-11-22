import styled from '@emotion/styled';

export const CustomButton = styled.button`
  width: 80%;
  padding: 0.3rem 0 0.3rem 0;
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  font-size: ${(props) => props.theme.font.size.xs};
  font-weight: ${(props) => props.theme.font.weight.bold700};
  border: none;
  border-radius: 50px;
`;