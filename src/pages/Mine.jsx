import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import SleepingPikachu from '../assets/pikachu-sleeping.gif';
import Pokemon1 from '../assets/pokemon1.gif';
import axios from '../api/axios';
import { useAuth } from '../contexts/AuthContext';
import makeWorkerApiAndCleanup from '../workers/workerHooks';
import usePageVisibility from '../hooks/usePageVisibility';

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

const usePostBlock = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const toast = useToast();
  const mutation = useMutation(['postBlockHash'], postBlock, {
    onSuccess: () => {
      queryClient.invalidateQueries(['lastBlock']);
      queryClient.invalidateQueries(['balance', user?.token]);
      toast({
        title: 'Block mined.',
        description: 'You mined a block.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'bottom-right',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error.',
        description: error?.response?.data?.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-right',
      });
    },
  });
  return mutation;
};

const useGetLastBlock = () => {
  return useQuery({
    queryKey: ['lastBlock'],
    queryFn: getLastBlock,
  });
};

const useGetCurrentDifficulty = () => {
  return useQuery({
    queryKey: ['currentDifficulty'],
    queryFn: getCurrentDifficulty,
  });
};

function Mine() {
  const [isRunning, setIsRunning] = useState(false);
  const [data, setData] = useState(null);
  const { user } = useAuth();
  const pageVisibilityStatus = usePageVisibility();

  const { mutate: mutatePostBlock } = usePostBlock();
  const { data: lastBlock } = useGetLastBlock();
  const { data: currentDifficulty } = useGetCurrentDifficulty();

  useEffect(() => {
    const { workerApi, cleanup } = makeWorkerApiAndCleanup();
    if (isRunning && !pageVisibilityStatus) {
      setData({ isCalculating: true, result: undefined });
      workerApi.mine(lastBlock.hash, currentDifficulty).then((x) => {
        setData({ isCalculating: false, result: x });
        mutatePostBlock({ data: x, token: user?.token });
      });
    } else if (isRunning && pageVisibilityStatus) {
      setData({ isCalculating: false, result: undefined });
      setIsRunning(false);
      cleanup();
    } else {
      cleanup();
    }
    return () => cleanup();
  }, [
    isRunning,
    lastBlock,
    currentDifficulty,
    user?.token,
    mutatePostBlock,
    pageVisibilityStatus,
  ]);

  return (
    <Flex justifyContent="center" h="90%">
      <Center>
        <Flex flexDirection="column" gap={2}>
          <Box position="relative">
            <Image
              src={isRunning ? Pokemon1 : SleepingPikachu}
              height="200px"
            />
          </Box>

          <Button
            size="sm"
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
