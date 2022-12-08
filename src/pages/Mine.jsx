import { Flex, Image } from '@chakra-ui/react';
import RunningPikachu from '../assets/pikachu-running.gif';

function Home() {
  return (
    <Flex justifyContent="center">
      <Image src={RunningPikachu} height="200px" />
    </Flex>
  );
}

export default Home;
