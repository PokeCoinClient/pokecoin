import axios from '../api/axios.js';

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

export { getLastBlock, getCurrentDifficulty, postBlock };
