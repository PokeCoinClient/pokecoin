import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import axios from '../api/axios';
import InputField from './InputField';

const axiosLogin = async (data) => {
  const resp = await axios.post('/auth/login', data);
  return resp.data;
};

const axiosRegister = async (data) => {
  const resp = await axios.post('/auth/register', data);
  return resp.data;
};

const axiosMe = async (token) => {
  const resp = await axios.get('/auth/me', {
    headers: {
      token: `${token}`,
    },
  });
  return resp.data;
};

function Login() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      serverError: '',
    },
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { setLogin } = useAuth();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const { mutate: getMe } = useMutation(['me'], axiosMe, {});

  const { mutate: loginMutate } = useMutation(['login'], axiosLogin, {
    onSuccess: (data) => {
      setLogin(data?.token);
      onClose();
      getMe(data?.token);
      toast({
        title: 'Logged in.',
        description: 'You are now logged in.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'bottom-right',
      });
    },
    onError: (data) => {
      let errField;
      if (data.response.data?.code === 'UserNotFoundError') {
        errField = 'username';
      } else if (data.response.data?.code === 'PasswordIncorrectError') {
        errField = 'password';
      }
      setError(errField, {
        type: 'serverError',
        message: data.response.data?.message,
      });
    },
  });

  const { mutate: registerMutate } = useMutation(['register'], axiosRegister, {
    onSuccess: () => {
      toast({
        title: 'Registered.',
        description: 'You are now registered.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'bottom-right',
      });
    },
    onError: (data) => {
      let errField;
      if (data.response.data?.code === 'UserAlreadyExistsError') {
        errField = 'username';
      }
      setError(errField, {
        type: 'serverError',
        message: data.response.data?.message,
      });
    },
  });

  return (
    <>
      <Button bg="#f8d077" h="100%" color={'black'} size="lg" onClick={onOpen}>
        Login
      </Button>
      <Modal
        size={['xs', 'sm', 'md']}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent backgroundColor={useColorModeValue('#fff', '#202023')}>
          <ModalHeader>Sign In</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit((data) => loginMutate(data))}>
            <ModalBody>
              <Flex flexDirection="column" gap={5}>
                <InputField
                  register={register}
                  errors={errors}
                  name="username"
                  label="username"
                />
                <InputField
                  register={register}
                  errors={errors}
                  name="password"
                  label="password"
                  isPassword
                />
              </Flex>
            </ModalBody>
            <ModalFooter justifyContent="space-between">
              <Box>
                <Button
                  size={['xs', 'sm']}
                  type="submit"
                  colorScheme="blue"
                  mr={3}
                >
                  Sign in
                </Button>

                <Button
                  size={['xs', 'sm']}
                  onClick={handleSubmit((data) => registerMutate(data))}
                  colorScheme="blue"
                  mr={3}
                >
                  Register
                </Button>
              </Box>
              <Button
                size={['xs', 'sm']}
                onClick={() => {
                  reset();
                  onClose();
                }}
              >
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Login;
