import axios from '../api/axios.js';

const changePassword = async (data, token) => {
  const resp = await axios.post('/auth/changePassword', data, {
    headers: {
      token: `${token}`,
    },
  });
  return resp.data;
};

const getMe = async (token) => {
  const resp = await axios.get('/auth/me', {
    headers: {
      token: `${token.queryKey[1]}`,
    },
  });
  return resp.data;
};

export { changePassword, getMe };
