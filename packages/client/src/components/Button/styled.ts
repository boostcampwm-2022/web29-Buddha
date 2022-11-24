import styled from '@emotion/styled';

export const CustomButton = styled.button`
  width: 100%;
  padding: 0.3rem 1rem 0.3rem 1rem;
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  font-size: ${(props) => props.theme.font.size.xs};
  font-weight: ${(props) => props.theme.font.weight.bold700};
  border: none;
  border-radius: 50px;

  &.wd-80 {
    width: 80%;
  }

  &.wd-fit {
    width: fit-content;
  }

  &.disabled {
    background-color: ${(props) => props.theme.colors.grey200};
  }
`;
