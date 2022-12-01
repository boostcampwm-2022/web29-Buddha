import styled from '@emotion/styled';

export const MenuListPageWrapper = styled.div`
  width: 100%;
`;

export const MenuListWrapper = styled.ul`
  margin: 0 2rem 6.5rem 2rem;
`;

export const CategoryBarWrapper = styled.ul`
  display:flex;
  overflow-x: auto;
  white-space: nowrap;
  border-bottom: 1px solid ${(props) => props.theme.colors.grey200};

  &::-webkit-scrollbar{
    display:none;
  }
`;

export const CategoryItem = styled.li`
  display: inline-block;
  padding: 0.2rem 0.5rem 0.2rem 0.5rem;
  color: ${(props) => props.theme.colors.secondary};
  font-size: ${(props) => props.theme.font.size.sm};
`;
