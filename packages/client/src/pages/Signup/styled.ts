import styled from '@emotion/styled';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 5rem;
  gap: 3rem;
`;

export const ChangeForm = styled.div``;

export const ChangeButton = styled.span`
  padding: 0.8rem 1.5rem 0.8rem 1.5rem;

  ${(props) => ({
    borderBottom: `2px solid ${props.theme.colors.grey600}`,
    fontSize: props.theme.font.size.sm,
    fontWeight: props.theme.font.weight.bold700,
  })}

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
  color: white;
  border: none;
  border-radius: 50px;

  ${(props) => ({
    backgroundColor: props.theme.colors.primary,
    fontSize: props.theme.font.size.xs,
    fontWeight: props.theme.font.weight.bold700,
  })}
`;
