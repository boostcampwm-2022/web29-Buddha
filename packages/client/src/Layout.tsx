import { ReactNode } from 'react';
import { ThemeProvider } from '@emotion/react';

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

function Layout({ children }: Props) {
  return (
    <ThemeProvider theme={theme}>
      <div>{children}</div>
    </ThemeProvider>
  );
}

export default Layout;
