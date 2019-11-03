import jwtDecode from 'jwt-decode'
import * as profile from '../actions/profile'

const initialState = {
  payload: undefined,
  profilePayload: undefined,
  bids: -1
}

export default (state=initialState, action) => {
  switch(action.type) {
    case profile.PROFILE_REQUEST:
      return {
        ...state,
        profilePayload: action
      }
    case profile.PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        profilePayload: action
      }
    case profile.PROFILE_FAILURE:
      return {
        ...state,
        profilePayload: action
      }
    case profile.CART_REQUEST:
      return {
        ...state,
      }
    case profile.CART_SUCCESS:
      return {
        ...state,
        cart: action.payload,
        cartPayload: action
      }
    case profile.CART_FAILURE:
      return {
        ...state,
        cart: action.payload,
        cartPayload: action
      }
    case profile.BID_COUNT_REQUEST:
      return {
        ...state,
      }
    case profile.BID_COUNT_SUCCESS:
      return {
        ...state,
        bids: action.payload.bids
      }
    case profile.BID_COUNT_FAILURE:
      return {
        ...state,
        bids: -2
      }
    default:
      return {
        ...state
      }
  }
}

export function getUserProfile(state) {
  if (state.profile) {
    return state.profile
  } else {
    return undefined
  }
}

export function getUserProfileResponse(state) {
  if (state.profilePayload) {
    return state.profilePayload
  } else {
    return undefined
  }
}

export function getCartInfo(state) {
  if (state.cart) {
    return state.cart
  } else {
    return undefined
  }
}

export function getBidInfo(state) {
  if (state.bids > -1) {
    return state.bids
  }
  else {
    return "-"
  }
}
