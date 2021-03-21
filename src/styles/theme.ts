import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const fonts = { mono: `'Menlo', monospace` };
const fontSizes = {
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.8rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
  '6xl': '4rem',
};

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
});

export const theme = extendTheme({
  colors: {
    black: '#16161D',
  },
  fonts,
  fontSizes,
  breakpoints,
});
