import {
  Box,
  Button,
  Flex,
  Image,
  Spacer,
  Text,
  Tooltip,
  useColorModeValue,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import SleepingPikachu from '../assets/pikachu-sleeping.gif';
import RunningPikachu from '../assets/pikachu-running.gif';
import Pokemon1 from '../assets/pokemon1.gif';
import Pokemon2 from '../assets/pokemon2.webp';
import Pokemon3 from '../assets/pokemon3.gif';
import Pokemon4 from '../assets/pokemon4.gif';
import Pokemon5 from '../assets/pokemon5.webp';
import axios from '../api/axios';
import { useAuth } from '../contexts/AuthContext';
import makeWorkerApiAndCleanup from '../workers/workerHooks';
import usePageVisibility from '../hooks/usePageVisibility';
import { TimeIcon } from '@chakra-ui/icons';

const MiningGifs = [
  Pokemon1,
  RunningPikachu,
  Pokemon2,
  Pokemon3,
  Pokemon4,
  Pokemon5,
];

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
  return useMutation(['postBlockHash'], postBlock, {
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
  const [selectedImage, setSelectedImage] = useState(null);
  const { user } = useAuth();
  const pageVisibilityStatus = usePageVisibility();

  const { mutate: mutatePostBlock } = usePostBlock();
  const { data: lastBlock } = useGetLastBlock();
  const { data: currentDifficulty } = useGetCurrentDifficulty();

  const workerRef = useRef(null);

  useEffect(() => {
    if (isRunning && workerRef.current == null) {
      workerRef.current = makeWorkerApiAndCleanup();
      workerRef.current.workerApi
        .mine(lastBlock.hash, currentDifficulty)
        .then((res) => {
          mutatePostBlock({ data: res, token: user?.token });
          workerRef.current.cleanup();
          workerRef.current = null;
        });
    }
  }, [currentDifficulty, isRunning, lastBlock, mutatePostBlock, user?.token]);

  useEffect(() => {
    if (pageVisibilityStatus || !isRunning) {
      if (workerRef.current) {
        workerRef.current.cleanup();
        workerRef.current = null;
        setIsRunning(false);
      }
    }
  }, [isRunning, pageVisibilityStatus]);

  useEffect(() => {
    return () => workerRef?.current?.cleanup();
  }, []);

  return (
    <Flex
      flexDirection={{
        base: 'column',
        lg: 'row',
      }}
    >
      <Flex
        borderRadius={'10px'}
        flexDirection={{
          lg: 'column',
        }}
        gap={1}
        justifyContent={'space-between'}
        border={'1px solid #554739'}
      >
        {MiningGifs.map((x, idx) => {
          return (
            <Box
              key={idx}
              bg={'#ecbe4a'}
              borderRadius={'5px'}
              cursor="pointer"
              border={selectedImage === x ? '1px solid #554739' : ''}
            >
              <Image
                src={x}
                width={'125px'}
                userSelect={'none'}
                objectFit={'cover'}
                overflow="hidden"
                onClick={() => setSelectedImage(x)}
              />
            </Box>
          );
        })}
      </Flex>
      <VStack flex={1} border={'1px solid #554739'} borderRadius={'10px'}>
        {lastBlock && (
          <Box pl={5} width={'100%'} justifyContent={'space-evenly'}>
            <Text fontSize="xl">Last Block:</Text>
            <Box display="flex" alignItems="center" gap={1}>
              <Tooltip label={'lol'}>
                <TimeIcon />
              </Tooltip>
              <Text fontSize="xl">{lastBlock.hash.substring(0, 10)}...</Text>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Tooltip label={'lol'}>
                <TimeIcon />
              </Tooltip>
              <Text fontSize="xl">
                {new Date(lastBlock.timestamp).toLocaleString()}
              </Text>
            </Box>
          </Box>
        )}
        <Flex
          borderTop={'3px solid #554739'}
          borderBottom={'3px solid #554739'}
          width={'100%'}
          height={'100%'}
          justifyContent={'center'}
          flexDirection="column"
          gap={2}
          alignItems="center"
        >
          <Box position="relative">
            <Image
              src={isRunning ? selectedImage : SleepingPikachu}
              height="200px"
            />
          </Box>
        </Flex>

        <Button
          size={['sm', 'md', 'lg']}
          disabled={!selectedImage}
          onClick={() => setIsRunning(!isRunning)}
          colorScheme={useColorModeValue('blue', 'yellow')}
        >
          {isRunning ? 'Stop Mining' : 'Start Mining'}
        </Button>
        <Spacer />
      </VStack>
    </Flex>
  );
}

export default Mine;
