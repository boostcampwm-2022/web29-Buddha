import styled from '@emotion/styled';

export const Container = styled.section<{ selected: string }>`
  margin: 10% 5%;
  display: flex;
  justify-content: center;

  & > span {
    padding: 5px;
    width: 50%;
    text-align: center;
    color: white;
  }

  & > .hot {
    border-top-left-radius: 100px;
    border-bottom-left-radius: 100px;
    border: ${(props) => props.theme.border.default};
    border-color: ${(props) => props.theme.colors.grey200};
    background-color: ${(props) => (props.selected === 'hot' ? 'red' : '')};
    color: ${(props) =>
      props.selected === 'hot' ? 'white' : props.theme.colors.grey600};
  }

  & > .iced {
    border-top-right-radius: 100px;
    border-bottom-right-radius: 100px;
    border: ${(props) => props.theme.border.default};
    border-color: ${(props) => props.theme.colors.grey200};
    background-color: ${(props) => (props.selected === 'iced' ? 'blue' : '')};
    color: ${(props) =>
      props.selected === 'iced' ? 'white' : props.theme.colors.grey600};
  }
`;
