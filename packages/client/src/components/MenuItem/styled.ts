import styled from '@emotion/styled';

export const MenuWrapper = styled.li`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 100%;
  margin: 1rem 0 1rem 0;
`;

export const MenuImg = styled.img`
  width: 5rem;
  border-radius: 50%;
`;

export const MenuInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  font-size: ${(props) => props.theme.font.size.sm}
`
