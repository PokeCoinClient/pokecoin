import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const config = {};

const styles = {
  global: (props) => ({
    body: {
      bg: mode('#eaeae8', '#202023')(props),
      width: '100%',
      height: '100%',
    },
  }),
};

const components = {
  Modal: {
    baseStyle: (props) => ({
      dialog: {
        bg: mode('#eaeae8', '#202023')(props),
      },
    }),
  },
};

const fonts = {};

const theme = extendTheme({ config, fonts, styles, components });
export default theme;
