import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};

const styles = {
  global: (props) => ({
    html: {
      height: '100%',
      width: '100%',
    },
    body: {
      //      bgGradient: 'linear(to-b, #5a4c3f 10%, #b69461)',
      bg: mode('#fff', '#202023')(props),
    },
  }),
};

const fonts = {};

const theme = extendTheme({ config, fonts, styles });
export default theme;
