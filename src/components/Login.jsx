import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import axios from '../api/axios';

const axiosLogin = async (data) => {
  const resp = await axios.post('/auth/login', data);
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
    control,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      serverError: '',
    },
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setLogin } = useAuth();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const { mutate: getMe } = useMutation(['me'], axiosMe, {});

  const { mutate: loginMutate } = useMutation(['login'], axiosLogin, {
    onSuccess: (data) => {
      setLogin(data?.token);
      onClose();
      getMe(data?.token);
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

  const onSubmit = (data) => {
    loginMutate(data);
  };

  return (
    <>
      <Button size="xs" onClick={onOpen}>
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <Flex flexDirection="column" gap={5}>
                <FormControl id="username" isInvalid={errors.username}>
                  <FormLabel>Username</FormLabel>
                  <Input
                    {...register('username', {
                      required: { value: true, message: 'This is required.' },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.username?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl id="password" isInvalid={errors.password}>
                  <FormLabel>password</FormLabel>
                  <Input
                    type="password"
                    autoComplete="true"
                    {...register('password', {
                      required: { value: true, message: 'This is required.' },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.password?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormErrorMessage>
                  {JSON.stringify(errors.username?.serverError)}
                </FormErrorMessage>
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
                  type="submit"
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
