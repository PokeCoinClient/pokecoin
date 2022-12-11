import {
  Button,
  Center,
  Flex,
  Image,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import RunningPikachu from '../assets/pikachu-running.gif';
import SleepingPikachu from '../assets/pikachu-sleeping.gif';

function Mine() {
  const [isRunning, setIsRunning] = useState(false);

  return (
    <Flex justifyContent="center" h="90%">
      <Center>
        <Flex flexDirection="column" gap={2}>
          {isRunning ? (
            <Image src={RunningPikachu} height="200px" width="250px" />
          ) : (
            <Image src={SleepingPikachu} height="200px" width="250px" />
          )}

          <Button
            onClick={() => setIsRunning(!isRunning)}
            colorScheme={useColorModeValue('blue', 'yellow')}
          >
            <Text>{isRunning ? 'Stop Mining' : 'Start Mining'}</Text>
          </Button>
        </Flex>
      </Center>
    </Flex>
  );
}

export default Mine;
