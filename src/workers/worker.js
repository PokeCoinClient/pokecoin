import * as CryptoJS from 'crypto-js';

const calculateHash = (block) => {
  const information =
    block.previousHash +
    block.timestamp.toString() +
    block.data +
    block.nonce.toString();
  return CryptoJS.SHA256(information).toString(CryptoJS.enc.Hex);
};
export const mine = (previousHash, currentDifficulty) => {
  let timestamp = Date.now();
  const max = Number.MAX_SAFE_INTEGER;
  let nonce = 0;
  let newBlock;
  while (nonce <= max) {
    nonce += 1;
    newBlock = {
      previousHash,
      timestamp,
      data: 'hehe xd',
      nonce,
    };

    if (nonce === max) {
      nonce = 0;
      timestamp = Date.now();
    }

    if (
      calculateHash(newBlock).startsWith(
        Array(currentDifficulty).fill(0).join('')
      )
    ) {
      return newBlock;
    }
  }
  return null;
};
