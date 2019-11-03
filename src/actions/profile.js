import { API_ROOT } from '../index';
import { RSAA } from 'redux-api-middleware';
import { withAuth } from '../reducers'

export const PROFILE_REQUEST = '@@bid/PROFILE_REQUEST';
export const PROFILE_SUCCESS = '@@bid/PROFILE_SUCCESS';
export const PROFILE_FAILURE = '@@bid/PROFILE_FAILURE';

export const BID_COUNT_REQUEST = '@@bid/BID_COUNT_REQUEST';
export const BID_COUNT_SUCCESS = '@@bid/BID_COUNT_SUCCESS';
export const BID_COUNT_FAILURE = '@@bid/BID_COUNT_FAILURE';

export const CART_REQUEST = '@@cart/CART_REQUEST';
export const CART_SUCCESS = '@@cart/CART_SUCCESS';
export const CART_FAILURE = '@@cart/CART_FAILURE';

export const getUserProfile = (unique_id) => ({
  [RSAA]: {
      endpoint: API_ROOT + '/api/users/profile/',
      method: 'GET',
      headers: withAuth({ 'Content-Type': 'application/json' }),
      types: [
        PROFILE_REQUEST, PROFILE_SUCCESS, PROFILE_FAILURE
      ]
  }
})

export const getCart = () => ({
  [RSAA]: {
      endpoint: API_ROOT + '/api/cart/',
      method: 'GET',
      headers: withAuth({ 'Content-Type': 'application/json' }),
      types: [
        CART_REQUEST, CART_SUCCESS, CART_FAILURE
      ]
  }
})

export const getBidCount = () => ({
  [RSAA]: {
      endpoint: API_ROOT + '/api/bids/',
      method: 'GET',
      headers: withAuth({ 'Content-Type': 'application/json' }),
      types: [
        BID_COUNT_REQUEST, BID_COUNT_SUCCESS, BID_COUNT_FAILURE
      ]
  }
})
