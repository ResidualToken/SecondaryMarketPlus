import { RSAA } from 'redux-api-middleware';

import { API_ROOT } from '../index'

export const LOGIN_REQUEST = '@@auth/LOGIN_REQUEST';
export const LOGIN_SUCCESS = '@@auth/LOGIN_SUCCESS';
export const LOGIN_FAILURE = '@@auth/LOGIN_FAILURE';
export const REGISTER_REQUEST = '@@auth/REGISTER_REQUEST';
export const REGISTER_SUCCESS = '@@auth/REGISTER_SUCCESS';
export const REGISTER_FAILURE = '@@auth/REGISTER_FAILURE';
export const REGISTER_ALTERNATE_REQUEST = '@@auth/REGISTER_ALTERNATE_REQUEST';
export const REGISTER_ALTERNATE_SUCCESS = '@@auth/REGISTER_ALTERNATE_SUCCESS';
export const REGISTER_ALTERNATE_FAILURE = '@@auth/REGISTER_ALTERNATE_FAILURE';
export const SOCIAL_FACEBOOK_REQUEST = '@@auth/SOCIAL_FACEBOOK_REQUEST';
export const SOCIAL_FACEBOOK_SUCCESS = '@@auth/SOCIAL_FACEBOOK_SUCCESS';
export const SOCIAL_FACEBOOK_FAILURE = '@@auth/SOCIAL_FACEBOOK_FAILURE';

export const LOGOUT_REQUEST = "@@auth/LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "@@auth/LOGOUT_SUCCESS";
export const TOKEN_REQUEST = '@@auth/TOKEN_REQUEST';
export const TOKEN_RECEIVED = '@@auth/TOKEN_RECEIVED';
export const TOKEN_FAILURE = '@@auth/TOKEN_FAILURE';

export const login = (email, password) => ({
  [RSAA]: {
    endpoint: API_ROOT + '/api/users/login/',
    method: 'POST',
    body: JSON.stringify({"user":{"email": email, "password": password}}),
    headers: { 'Content-Type': 'application/json' },
    types: [
      LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE
    ]
  }
})

export const loginFB = (accessToken) => ({
  [RSAA]: {
    endpoint: API_ROOT + '/api/auth/social/facebook/',
    method: 'POST',
    body: JSON.stringify({"provider":"facebook", "access_token":accessToken}),
    headers: { 'Content-Type': 'application/json' },
    types: [
      SOCIAL_FACEBOOK_REQUEST, SOCIAL_FACEBOOK_SUCCESS, SOCIAL_FACEBOOK_FAILURE
    ]
  }
})

export const registerAlternateUser = (email, username, oneTimeToken, accessToken) => ({
  [RSAA]: {
    endpoint: API_ROOT + '/api/auth/social/facebook/',
    method: 'POST',
    body: JSON.stringify({
      "provider":"facebook",
      "email": email,
      "username": username,
      "one_time_token": oneTimeToken,
      "access_token": accessToken,
    }),
    headers: { 'Content-Type': 'application/json' },
    types: [
      SOCIAL_FACEBOOK_REQUEST, SOCIAL_FACEBOOK_SUCCESS, SOCIAL_FACEBOOK_FAILURE
    ]
  }
})


export const registerUser = (email, username, password) => ({
  [RSAA]: {
    endpoint: API_ROOT + '/api/users/register/',
    method: 'POST',
    body: JSON.stringify({
        "user": {
        "email": email,
        "username": username,
        "password": password
      }
    }),
    headers: { 'Content-Type': 'application/json' },
    types: [
      REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE
    ]
  }
})

export const refreshAccessToken = (token) => ({
  [RSAA]: {
    endpoint: API_ROOT + '/api-token-refresh/',
    method: 'POST',
    body: JSON.stringify({refresh: token}),
    headers: { 'Content-Type': 'application/json' },
    types: [
      TOKEN_REQUEST, TOKEN_RECEIVED, TOKEN_FAILURE
    ]
  }
})
