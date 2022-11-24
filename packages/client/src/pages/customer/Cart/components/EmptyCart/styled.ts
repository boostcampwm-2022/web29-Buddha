import styled from '@emotion/styled';

export const EmptyCartWrapper = styled.div`
  width: 100%;
  padding: 1rem 1rem 1rem 1rem;

  p {
    padding: 0 0 0.7rem 0;
  }
  
  p.empty-title { 
    font-weight: ${(props) => props.theme.font.weight.bold700};
  }

  p.description {
    padding-right: 5rem;
    font-size: ${(props) => props.theme.font.size.sm};
    color: ${(props) => props.theme.colors.grey600};
  }
`;
