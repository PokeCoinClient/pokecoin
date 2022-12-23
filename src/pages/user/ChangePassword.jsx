import {
  Box,
  Button,
  Flex,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import InputField from '../../components/InputField';
import { useAuth } from '../../contexts/AuthContext';
import axios from '../../api/axios.js';

const changePassword = async (data, token) => {
  const resp = await axios.post('/auth/changePassword', data, {
    headers: {
      token: `${token}`,
    },
  });
  return resp.data;
};

function ChangePassword() {
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

  const { user } = useAuth();
  const toast = useToast();
  const { mutate: mutateChangePassword } = useMutation(
    ['changePassword'],
    (data) => changePassword(data, user.token),
    {
      onSuccess: () => {
        toast({
          title: 'Changed password',
          description: 'Sucessfully changed password',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'bottom-right',
        });
      },
      onError: (data) => {
        let errField;
        if (data.response.data?.code === 'PasswordIncorrectError') {
          errField = 'password';
        }
        setError(errField, {
          type: 'serverError',
          message: data.response.data?.message,
        });
      },
    }
  );
  return (
    <Box>
      <Heading>Change password</Heading>
      <Box mt={3}>
        <form
          onSubmit={handleSubmit((data) => {
            mutateChangePassword(data);
            reset();
          })}
        >
          <Flex flexDirection="column" gap={5}>
            <InputField
              register={register}
              errors={errors}
              label="Current password"
              name="password"
              isPassword
            />
            <InputField
              register={register}
              errors={errors}
              label="New Password"
              name="newPassword"
              isPassword
            />
          </Flex>
          <Box mt={5}>
            <Button size={['xs', 'sm']} type="submit" colorScheme="blue" mr={3}>
              Save
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default ChangePassword;
