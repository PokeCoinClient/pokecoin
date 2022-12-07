import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};

const styles = {
  global: (props) => ({
    body: {
      bg: mode('#f0e7db', '#202023')(props),
    },
  }),
};

const fonts = {
  heading: 'Inter',
  body: 'Silkscreen',
};

const theme = extendTheme({ config, fonts, styles });
export default theme;
