import { Button, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';

function ThemeToggleButton() {
  const { toggleColorMode } = useColorMode();

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <motion.div
        style={{ display: 'inline-block' }}
        key={useColorModeValue('light', 'dark')}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Button
          size="xs"
          minW="70px"
          aria-label="Toggle theme"
          colorScheme={useColorModeValue('blue', 'yellow')}
          onClick={toggleColorMode}
        >
          {useColorModeValue('Dark', 'Light')}
        </Button>
      </motion.div>
    </AnimatePresence>
  );
}

export default ThemeToggleButton;
