import jwtDecode from 'jwt-decode'
import * as auth from '../actions/auth'

const initialState = {
  access: undefined,
  refresh: undefined,
  errors: {},
}

export default (state=initialState, action) => {
  switch(action.type) {
    case auth.REGISTER_REQUEST:
      return {
        ...state,
        payload: action
      }
    case auth.REGISTER_SUCCESS:
      return {
        ...state,
        payload: action
      }
    case auth.REGISTER_FAILURE:
      return {
        ...state,
        payload: action
      }
      case auth.REGISTER_REQUEST:
        return {
          ...state,
          payload: action
        }
    case auth.REGISTER_ALTERNATE_REQUEST:
      return {
        ...state,
        payload: action
      }
    case auth.REGISTER_ALTERNATE_SUCCESS:
      return {
        ...state,
        payload: action
      }
    case auth.REGISTER_ALTERNATE_FAILURE:
      return {
        ...state,
        payload: action
      }
    case auth.SOCIAL_FACEBOOK_SUCCESS:
      console.log(action.payload)
      return {
        username: action.payload.username,
        email: action.payload.email,
        access: {
          token: action.payload.token,
          ...jwtDecode(action.payload.token)
        },
        errors: {}
      }
    case auth.SOCIAL_FACEBOOK_FAILURE:
      return {
        ...state
      }
    case auth.LOGIN_SUCCESS:
      return {
        username: action.payload.username,
        email: action.payload.email,
        access: {
          token: action.payload.token,
          ...jwtDecode(action.payload.token)
        },
        errors: {}
      }
    case auth.LOGIN_FAILURE:
      return {
        ...state
      }
    case auth.LOGOUT_SUCCESS:
      return {
        ...state,
        access: undefined,
        refresh: undefined,
        errors: action.payload.response || {'non_field_errors': action.payload.statusText},
      }
    default:
      return state
    }
}

export function accessToken(state) {
  if (state.access) {
    return state.access.token
  }
}

export function isAccessTokenExpired(state) {
  if (state.access && state.access.exp) {
    return 1000 * state.access.exp - (new Date()).getTime() < 5000
  }
  return true
}

export function refreshToken(state) {
  if (state.refresh)
    return state.refresh.token
}

export function isRefreshTokenExpired(state) {
  if (state.refresh && state.refresh.exp) {
    return 1000 * state.refresh.exp - (new Date()).getTime() < 5000
  }
  return true
}

export function isAuthenticated(state) {
  return !isRefreshTokenExpired(state)
}

export function isTempAuthenticated(state) {
  return state.access !== undefined
}

export function getUserId(state) {
  if (state.username) {
    return state.username
  }
}

export function getUserName(state){
  if(state.username){
    return state.username
  }
}

export function errors(state) {
  return  state.errors
}

export function grabAccessToken(state) {
  return {
    access: {
      token: accessToken,
      ...jwtDecode(accessToken)
    }
  }
}
