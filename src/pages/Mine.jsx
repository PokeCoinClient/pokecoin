import {
  Button,
  Center,
  Flex,
  Image,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import RunningPikachu from '../assets/pikachu-running.gif';
import SleepingPikachu from '../assets/pikachu-sleeping.gif';
import axios from '../api/axios';
import { useAuth } from '../contexts/AuthContext';
import makeWorkerApiAndCleanup from '../workers/workerHooks';

const getLastBlock = async () => {
  const resp = await axios.get('/blockchain/lastBlock');
  return resp.data;
};

const getCurrentDifficulty = async () => {
  const resp = await axios.get('/blockchain/currentDifficulty');
  return resp.data;
};

const postBlock = async ({ data, token }) => {
  const resp = await axios.post('/blockchain/blocks', data, {
    headers: {
      token: `${token}`,
    },
  });
  return resp.data;
};

function Mine() {
  const queryClient = useQueryClient();
  const [isRunning, setIsRunning] = useState(false);
  const [data, setData] = useState(null);
  const { user } = useAuth();

  const { data: lastBlock } = useQuery({
    queryKey: ['lastBlock'],
    queryFn: getLastBlock,
  });

  const { data: currentDifficulty } = useQuery({
    queryKey: ['currentDifficulty'],
    queryFn: getCurrentDifficulty,
  });

  const { mutate: postBlockHash } = useMutation(['postBlockHash'], postBlock, {
    onSuccess: () => {
      queryClient.invalidateQueries(['lastBlock']);
      queryClient.invalidateQueries(['balance', user?.token]);
    },
  });

  useEffect(() => {
    const { workerApi, cleanup } = makeWorkerApiAndCleanup();
    if (isRunning) {
      setData({ isCalculating: true, result: undefined });
      workerApi.mine(lastBlock.hash, currentDifficulty).then((x) => {
        setData({ isCalculating: false, result: x });
        postBlockHash({ data: x, token: user?.token });
      });
    }
    return () => cleanup();
  }, [isRunning, lastBlock, currentDifficulty, user?.token, postBlockHash]);

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
          <Text>{JSON.stringify(data)}</Text>
        </Flex>
      </Center>
    </Flex>
  );
}

export default Mine;
