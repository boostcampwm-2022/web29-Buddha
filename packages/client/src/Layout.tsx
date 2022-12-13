import { ReactNode } from 'react';
import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';

interface Props {
  children: ReactNode;
}

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      primary: string;
      secondary: string;
      tertiary: string;
      fourth: string;
      grey200: string;
      grey400: string;
      grey600: string;
      grey800: string;
    };
    font: {
      size: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
      };
      weight: {
        bold300: string;
        bold500: string;
        bold700: string;
      };
    };
    border: {
      default: string;
      radius: string;
    };
  }
}

const theme = {
  colors: {
    primary: '#567F72',
    secondary: '#7D9D9C',
    tertiary: '#E4DCCF',
    fourth: '#F0EBE3',
    grey200: '#D7D7D7',
    grey400: '#A0A0A0',
    grey600: '#8E8E93',
    grey800: '#4B4B4B',
  },
  font: {
    size: {
      xs: '0.8rem',
      sm: '0.9rem',
      md: '1rem',
      lg: '1.2rem',
      xl: '1.5rem',
    },
    weight: {
      bold300: '300',
      bold500: '500',
      bold700: '700',
    },
  },
  border: {
    default: '1px solid black',
    radius: '50%',
  },
};

const Container = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  min-width: 320px;
  max-width: 480px;
  min-height: 448px;
  background-color: white;
  overflow-y: scroll;

  &::-webkit-scrollbar{
    display: none;
  }

  @media screen and (min-width: 481px) {
    box-shadow: 0px 0px 4px rgba(204, 204, 204, 0.5),
    0px 0px 4px rgba(0, 0, 0, 0.25);
  }

  @media screen and (min-width: 481px) {
    left: calc(10% - 50px);
  }
`;
// 535
const MobileFirst = styled.div`
  
  width: 100%;
  height: 100vh;

  @media screen and (min-width: 481px) {
    background-image: url('https://kr.object.ncloudstorage.com/buddha-dev/logo.png');
    background-repeat: no-repeat;
    background-position: center;
  }
`;

function Layout({ children }: Props) {
  return (
    <ThemeProvider theme={theme}>
      <MobileFirst>
        <Container>{children}</Container>
      </MobileFirst>
    </ThemeProvider>
  );
}

export default Layout;
