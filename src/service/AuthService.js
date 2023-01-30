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
      token: `${token}`,
    },
  });
  return resp.data;
};

const login = async (data) => {
  const resp = await axios.post('/auth/login', data);
  return resp.data;
};

const register = async (data) => {
  const resp = await axios.post('/auth/register', data);
  return resp.data;
};

const getUserBalance = async (token) => {
  const resp = await axios.get('/wallet/balance', {
    headers: {
      token: `${token}`,
    },
  });
  return resp.data;
};

export { changePassword, getMe, register, login, getUserBalance };
