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
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import InputField from './InputField';
import { login, register as authRegister } from '../service/AuthService.js';

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
  const { user, setLogin } = useAuth();

  const { mutate: loginMutate } = useMutation(['login'], login, {
    onSuccess: (data) => {
      setLogin(data?.token);
      onClose();
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

  const { mutate: registerMutate } = useMutation(['register'], authRegister, {
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
                  label="Username"
                />
                <InputField
                  register={register}
                  errors={errors}
                  name="password"
                  label="Password"
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
