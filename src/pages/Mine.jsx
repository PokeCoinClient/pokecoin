import {
  Box,
  Button,
  Flex,
  Image,
  Skeleton,
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
import Pokemon1Img from '../assets/pokemon1.png';
import Pokemon2 from '../assets/pokemon2.gif';
import Pokemon3 from '../assets/pokemon3.gif';
import Pokemon4 from '../assets/pokemon4.gif';
import Pokemon5 from '../assets/pokemon5.gif';
import Pokemon2Img from '../assets/pokemon2.png';
import Pokemon3Img from '../assets/pokemon3.png';
import Pokemon4Img from '../assets/pokemon4.png';
import Pokemon5Img from '../assets/pokemon5.png';
import PikachuImg from '../assets/pikachu-running.png';
import { useAuth } from '../contexts/AuthContext';
import makeWorkerApiAndCleanup from '../workers/workerHooks';
import usePageVisibility from '../hooks/usePageVisibility';
import { InfoIcon, QuestionIcon, TimeIcon } from '@chakra-ui/icons';
import {
  getCurrentDifficulty,
  getLastBlock,
  postBlock,
} from '../service/BlockchainService.js';

const POKEMON = Object.freeze({
  SCIZOR: {
    name: 'Scizor',
    image: Pokemon1Img,
    gif: Pokemon1,
  },
  PIKACHU: {
    name: 'Pikachu',
    image: PikachuImg,
    gif: RunningPikachu,
  },
  HAUNTER: {
    name: 'Haunter',
    image: Pokemon2Img,
    gif: Pokemon2,
  },
  DRAGONITE: {
    name: 'Dragonite',
    image: Pokemon3Img,
    gif: Pokemon3,
  },
  CYNDAQUIL: {
    name: 'Cyndaquil',
    image: Pokemon4Img,
    gif: Pokemon4,
  },
  SHINX: {
    name: 'Shinx',
    image: Pokemon5Img,
    gif: Pokemon5,
  },
});

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
  const [selectedPokemon, setSelectedPokemon] = useState(null);
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
      >
        {Object.keys(POKEMON).map((x) => {
          return (
            <Box
              key={POKEMON[x].name}
              bg={'#ecbe4a'}
              borderRadius={'5px'}
              cursor="pointer"
              border={
                selectedPokemon === x ? '3px solid #554739' : '3px solid #fff'
              }
            >
              <Image
                src={POKEMON[x].image}
                fallback={<Skeleton height={'125px'} width={'125px'} />}
                width={'125px'}
                userSelect={'none'}
                objectFit={'cover'}
                overflow="hidden"
                onClick={() => setSelectedPokemon(x)}
              />
            </Box>
          );
        })}
      </Flex>
      <VStack
        flex={1}
        border={'3px solid #554739'}
        borderRadius={'10px'}
        ml={1}
      >
        {lastBlock && (
          <Box pl={5} width={'100%'} justifyContent={'space-evenly'}>
            <Text fontSize="lg">Last Block:</Text>
            <Box display="flex" alignItems="center" gap={1}>
              <Tooltip label={'Last Hash'}>
                <InfoIcon />
              </Tooltip>
              <Text fontSize="md">{lastBlock.hash}</Text>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Tooltip label={'Mined at'}>
                <TimeIcon />
              </Tooltip>
              <Text fontSize="md">
                {new Date(lastBlock.timestamp).toLocaleString()}
              </Text>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Tooltip label={'Mined by'}>
                <QuestionIcon />
              </Tooltip>
              <Text fontSize="md">{lastBlock.foundByUser.username}</Text>
            </Box>
          </Box>
        )}
        <Flex
          borderTop={'3px solid #554739'}
          borderBottom={'3px solid #554739'}
          width={'100%'}
          height={'100%'}
          justifyContent={'space-evenly'}
          flexDirection="column"
          gap={2}
          alignItems="center"
        >
          <Text fontSize="xl">
            {selectedPokemon
              ? `Selected Pokemon: ${POKEMON[selectedPokemon].name}`
              : 'Select a pokemon!'}
          </Text>
          <Box position="relative">
            <Image
              src={
                isRunning
                  ? POKEMON[selectedPokemon].gif
                  : selectedPokemon
                  ? POKEMON[selectedPokemon].image
                  : SleepingPikachu
              }
              height="200px"
            />
          </Box>
        </Flex>

        <Button
          size={['sm', 'md', 'lg']}
          disabled={!selectedPokemon}
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
