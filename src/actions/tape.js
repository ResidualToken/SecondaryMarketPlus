import { RSAA } from 'redux-api-middleware';

export const TAPE_GET_REQUEST = '@@bid/TAPE_GET_REQUEST';
export const TAPE_GET_SUCCESS = '@@bid/TAPE_GET_SUCCESS';
export const TAPE_GET_FAILURE = '@@bid/TAPE_GET_FAILURE';

export const getTapeRequest = (hash) => ({
  [RSAA]: {
      endpoint: 'https://gateway.ipfs.io/ipfs/'+hash,
      method: 'GET',
      types: [
        TAPE_GET_REQUEST, TAPE_GET_SUCCESS, TAPE_GET_FAILURE
      ]
  }
})
