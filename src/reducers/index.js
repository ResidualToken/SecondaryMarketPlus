import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import auth, * as fromAuth from './auth.js'
import auction, * as fromAuction from './auction.js'
import profile, * as fromProfile from './profile.js'

export default combineReducers({
  router: routerReducer,
  auth: auth,
  auction: auction,
  profile: profile
})
// export const clearAccessToken = state => fromAuth.clearAccessToken(state.auth)
// export const clearIdToken = state => fromAuth.clearAccessToken(state.auth)
export const getUserId = state => fromAuth.getUserId(state.auth)
export const getUserName = state => fromAuth.getUserName(state.auth)
export const isAuthenticated = state => fromAuth.isAuthenticated(state.auth)
export const isTempAuthenticated = state => fromAuth.isTempAuthenticated(state.auth)
export const accessToken = state => fromAuth.accessToken(state.auth)
export const isAccessTokenExpired = state => fromAuth.isAccessTokenExpired(state.auth)
export const refreshToken = state => fromAuth.refreshToken(state.auth)
export const isRefreshTokenExpired = state => fromAuth.isRefreshTokenExpired(state.auth)
export const authErrors = state => fromAuth.errors(state.auth)

export const getBidResponse = state => fromAuction.getBidResponse(state.auction)
export const getAutobidResponse = state => fromAuction.getAutobidResponse(state.auction)
export const getCurrentAuction = state => fromAuction.getCurrentAuction(state.auction)
export const getCurrentAuctions = state => fromAuction.getCurrentAuctions(state.auction)
export const getPastAuctions = state => fromAuction.getPastAuctions(state.auction)
export const getBuyBidpacks = state => fromAuction.getBuyBidpacks(state.auction)

export const getUserProfile = state => fromProfile.getUserProfile(state.profile)
export const getUserProfileResponse = state => fromProfile.getUserProfileResponse(state.profile)
export const getCartInfo = state => fromProfile.getCartInfo(state.profile)
export const getBids = state => fromProfile.getBidInfo(state.profile)

//export const getOrderWizardProducts = state => fromProducts.importOrderProducts(state.products)

export function withAuth(headers={}) {
  return (state) =>  {
    return {
      ...headers,
      'Authorization': `Bearer ${accessToken(state)}`
    }
  }
}
