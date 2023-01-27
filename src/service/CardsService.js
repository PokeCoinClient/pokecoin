import axios from '../api/axios.js';

const getCards = async (data) => {
  const resp = await axios.get(`/cards?page=${data}`);
  return resp.data;
};

const getUserCards = async (token) => {
  const resp = await axios.get(`/cards/usercards`, {
    headers: {
      token: `${token}`,
    },
  });
  return resp.data;
};

const getCardById = async (id) => {
  const resp = await axios.get(`/cards/${id}`);
  return resp.data;
};

const getCardPackages = async () => {
  const resp = await axios.get('/cards/packages');
  return resp.data;
};

const getCurrentPackagePrice = async () => {
  const resp = await axios.get(`/cards/packages/currentPackageCost`);
  return resp.data;
};

const buyPackageByName = async (data, token) => {
  const resp = await axios.get(`/cards/packages/${data}/buyDefaultPackage`, {
    headers: {
      token: `${token}`,
    },
  });
  return resp.data;
};

export {
  getCards,
  getUserCards,
  getCardPackages,
  getCurrentPackagePrice,
  buyPackageByName,
  getCardById,
};
