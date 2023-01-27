import { extendTheme } from '@chakra-ui/react';

const config = {};

const styles = {
  global: (props) => ({
    body: {
      bg: '#eaeae8',
      width: '100%',
      height: '100%',
    },
  }),
};

const fonts = {};

const theme = extendTheme({ config, fonts, styles });
export default theme;
