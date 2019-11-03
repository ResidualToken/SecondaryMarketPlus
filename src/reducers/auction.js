import jwtDecode from 'jwt-decode'
import * as auction from '../actions/auction'

const initialState = {
  payload: undefined,
  currentAuctions: {},
  pastAuctions: {}
}

export default (state=initialState, action) => {
  switch(action.type) {
    case auction.BID_REQUEST:
      return {
        ...state,
        payload: action
      }
    case auction.BID_SUCCESS:
      return {
        ...state,
        payload: action
      }
    case auction.BID_FAILURE:
      return {
        ...state,
        payload: action
      }
    case auction.AUTOBID_REQUEST:
      return {
        ...state,
        abPayload: action
      }
    case auction.AUTOBID_SUCCESS:
      return {
        ...state,
        abPayload: action
      }
    case auction.AUTOBID_FAILURE:
      return {
        ...state,
        abPayload: action
      }
    case auction.AUCTION_REQUEST:
      return {
        ...state,
        payload: action
      }
    case auction.AUCTION_SUCCESS:
      return {
        ...state,
        auction: action.payload
      }
    case auction.AUCTION_FAILURE:
      return {
        ...state,
        payload: action
      }
    case auction.CURRENT_AUCTIONS_REQUEST:
      return {
        ...state
      }
    case auction.CURRENT_AUCTIONS_SUCCESS:
      return {
        ...state,
        currentAuctions: action.payload.data
      }
    case auction.CURRENT_AUCTIONS_FAILURE:
      return {
        ...state,
        currentAuctions: action.payload
      }
    case auction.PAST_AUCTIONS_REQUEST:
      return {
        ...state
      }
    case auction.PAST_AUCTIONS_SUCCESS:
      return {
        ...state,
        pastAuctions: action.payload.data
      }
    case auction.PAST_AUCTIONS_FAILURE:
      return {
        ...state,
        pastAuctions: action.payload
      }
    case auction.BIDPACK_LIST_REQUEST:
      return {
        ...state
      }
    case auction.BIDPACK_LIST_SUCCESS:
      return {
        ...state,
        bidpacks: action.payload.data
      }
    case auction.BIDPACK_LIST_FAILURE:
      return {
        ...state,
      }
    default:
      return {
        ...state
      }
  }
}

export function getBidResponse(state) {
  if (state.payload) {
    return state.payload
  } else {
    return undefined
  }
}

export function getBuyBidpacks(state) {
  if (state.bidpacks) {
    return state.bidpacks
  } else {
    return undefined
  }
}

export function getAutobidResponse(state) {
  if (state.payload) {
    return state.payload
  } else {
    return undefined
  }
}

export function getCurrentAuction(state) {
  if (state.auction) {
    return state.auction
  } else {
    return undefined
  }
}

export function getCurrentAuctions(state) {
  return state.currentAuctions
}

export function getPastAuctions(state) {
  return state.pastAuctions
}
