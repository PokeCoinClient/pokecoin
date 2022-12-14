import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
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
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import axios from '../api/axios';

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

function InputField({ register, errors, name, label, isPassword = false }) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <FormControl isInvalid={errors[name]}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <InputGroup size="md">
        <Input
          {...register(name, { required: true })}
          type={isPassword && (show ? 'text' : 'password')}
        />
        {isPassword && (
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        )}
      </InputGroup>
      <FormErrorMessage>{errors[name]?.message}</FormErrorMessage>
    </FormControl>
  );
}

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
