import styled from '@emotion/styled';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  width: 100%;
  height: 100%;
  padding-top: 5rem;
`;

export const ChangeForm = styled.div``;

export const ChangeButton = styled.span`
  padding: 0.8rem 1.5rem 0.8rem 1.5rem;
  font-size: ${(props) => props.theme.font.size.sm};
  font-weight: ${(props) => props.theme.font.weight.bold700};
  border-bottom: ${(props) => `2px solid ${props.theme.colors.grey600}`};

  &.selected {
    border-bottom: ${(props) => `4px solid ${props.theme.colors.primary}`};
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 80%;
`;

export const InputTitle = styled.p`
  font-size: ${(props) => `${props.theme.font.size.xs}`};
`;

export const Input = styled.input`
  width: 100%;
`;

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
