import styled from '@emotion/styled';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  width: 100%;
  padding-top: 3rem;
`;

export const ChangeForm = styled.div`
  display: flex;
  flex-direction: row;
  width: 50%;
`;

export const ChangeButton = styled.span`
  width: 50%;
  padding: 0.8rem 0 0.8rem 0;
  font-size: ${(props) => props.theme.font.size.sm};
  font-weight: ${(props) => props.theme.font.weight.bold700};
  border-bottom: ${(props) => `2px solid ${props.theme.colors.grey600}`};
  text-align: center;

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
  font-size: ${(props) => props.theme.font.size.xs};
`;

export const Input = styled.input`
  width: 100%;
  padding: 0 0 0.2rem 0;
  font-size: ${(props) => props.theme.font.size.sm};
  border: none;
  border-bottom: ${(props) => `1px solid ${props.theme.colors.grey400}`};

  &:focus {
    outline: none;
  }
`;
