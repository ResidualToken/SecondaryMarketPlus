import { API_ROOT } from '../index';
import { RSAA } from 'redux-api-middleware';
import { withAuth } from '../reducers'

export const BID_REQUEST = '@@bid/BID_REQUEST';
export const BID_SUCCESS = '@@bid/BID_SUCCESS';
export const BID_FAILURE = '@@bid/BID_FAILURE';

export const SILENT_BID_REQUEST = '@@bid/SILENT_BID_REQUEST';
export const SILENT_BID_SUCCESS = '@@bid/SILENT_BID_SUCCESS';
export const SILENT_BID_FAILURE = '@@bid/SILENT_BID_FAILURE';

export const AUTOBID_REQUEST = '@@bid/AUTOBID_REQUEST';
export const AUTOBID_SUCCESS = '@@bid/AUTOBID_SUCCESS';
export const AUTOBID_FAILURE = '@@bid/AUTOBID_FAILURE';

export const AUCTION_REQUEST = '@@bid/PRODUCT_REQUEST';
export const AUCTION_SUCCESS = '@@bid/PRODUCT_SUCCESS';
export const AUCTION_FAILURE = '@@bid/PRODUCT_FAILURE';

export const CURRENT_AUCTIONS_REQUEST = '@@auction/CURRENT_AUCTIONS_REQUEST';
export const CURRENT_AUCTIONS_SUCCESS = '@@auction/CURRENT_AUCTIONS_SUCCESS';
export const CURRENT_AUCTIONS_FAILURE = '@@auction/CURRENT_AUCTIONS_FAILURE';

export const PAST_AUCTIONS_REQUEST = '@@auction/PAST_AUCTIONS_REQUEST';
export const PAST_AUCTIONS_SUCCESS = '@@auction/PAST_AUCTIONS_SUCCESS';
export const PAST_AUCTIONS_FAILURE = '@@auction/PAST_AUCTIONS_FAILURE';

export const BIDPACK_LIST_REQUEST = '@@auction/BIDPACK_LIST_REQUEST';
export const BIDPACK_LIST_SUCCESS = '@@auction/BIDPACK_LIST_SUCCESS';
export const BIDPACK_LIST_FAILURE = '@@auction/BIDPACK_LIST_FAILURE';

export const POST_BIDPACK_REQUEST = '@@auction/POST_BIDPACK_REQUEST';
export const POST_BIDPACK_SUCCESS = '@@auction/POST_BIDPACK_SUCCESS';
export const POST_BIDPACK_FAILURE = '@@auction/POST_BIDPACK_FAILURE';

export const REMOVE_PRODUCT_REQUEST = '@@auction/REMOVE_PRODUCT_REQUEST';
export const REMOVE_PRODUCT_SUCCESS = '@@auction/REMOVE_PRODUCT_SUCCESS';
export const REMOVE_PRODUCT_FAILURE = '@@auction/REMOVE_PRODUCT_FAILURE';

export const CART_VALIDATE_REQUEST = '@@auction/CART_VALIDATE_REQUEST';
export const CART_VALIDATE_SUCCESS = '@@auction/CART_VALIDATE_SUCCESS';
export const CART_VALIDATE_FAILURE = '@@auction/CART_VALIDATE_FAILURE';

export const CART_CHECKOUT_REQUEST = '@@auction/CART_CHECKOUT_REQUEST';
export const CART_CHECKOUT_SUCCESS = '@@auction/CART_CHECKOUT_SUCCESS';
export const CART_CHECKOUT_FAILURE = '@@auction/CART_CHECKOUT_FAILURE';

export const PROCESS_PURCHASE_REQUEST = '@@auction/PROCESS_PURCHASE_REQUEST';
export const PROCESS_PURCHASE_SUCCESS = '@@auction/PROCESS_PURCHASE_SUCCESS';
export const PROCESS_PURCHASE_FAILURE = '@@auction/PROCESS_PURCHASE_FAILURE';

export const removeProductFromCart = (unique_id) => ({
  [RSAA]: {
      endpoint: API_ROOT + '/api/cartitem/',
      method: 'DELETE',
      headers: withAuth({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({"unique_id":unique_id}),
      types: [
        REMOVE_PRODUCT_REQUEST, REMOVE_PRODUCT_SUCCESS, REMOVE_PRODUCT_FAILURE
      ]
  }
})

export const cartProcessCharge = (formData) => ({
  [RSAA]: {
      endpoint: API_ROOT + '/api/charge/',
      method: 'POST',
      headers: withAuth(),
      body: formData,
      types: [
        PROCESS_PURCHASE_REQUEST, PROCESS_PURCHASE_SUCCESS, PROCESS_PURCHASE_FAILURE
      ]
  }
})

export const cartValidate = () => ({
  [RSAA]: {
      endpoint: API_ROOT + '/api/checkout/',
      method: 'GET',
      headers: withAuth({ 'Content-Type': 'application/json' }),
      types: [
        CART_VALIDATE_REQUEST, CART_VALIDATE_SUCCESS, CART_VALIDATE_FAILURE
      ]
  }
})

export const cartPurchase = (addressInformation) => ({
  [RSAA]: {
      endpoint: API_ROOT + '/api/checkout/',
      method: 'POST',
      headers: withAuth({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({"status":"OK","data":addressInformation}),
      types: [
        CART_CHECKOUT_REQUEST, CART_CHECKOUT_SUCCESS, CART_CHECKOUT_FAILURE
      ]
  }
})


export const bidOnAuction = (unique_id) => ({
  [RSAA]: {
      endpoint: API_ROOT + '/api/auction/bid/',
      method: 'POST',
      headers: withAuth({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({"unique_id":unique_id}),
      types: [
        BID_REQUEST, BID_SUCCESS, BID_FAILURE
      ]
  }
})

export const autobidOnAuction = (unique_id, count, setStart) => ({
  [RSAA]: {
      endpoint: API_ROOT + '/api/auction/setauto/',
      method: 'POST',
      headers: withAuth({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({"unique_id":unique_id, "count": count, "start_at": setStart}),
      types: [
        AUTOBID_REQUEST, AUTOBID_SUCCESS, AUTOBID_FAILURE
      ]
  }
})


export const silentBidOnAuction = (unique_id, amount) => ({
  [RSAA]: {
      endpoint: API_ROOT + '/api/auction/bidsilent/',
      method: 'POST',
      headers: withAuth({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({"unique_id":unique_id,"amount": amount}),
      types: [
        SILENT_BID_REQUEST, SILENT_BID_SUCCESS, SILENT_BID_FAILURE
      ]
  }
})

export const getAuction = (unique_id) => ({
  [RSAA]: {
      endpoint: API_ROOT + '/api/auct/?id='+unique_id,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      types: [
        AUCTION_REQUEST, AUCTION_SUCCESS, AUCTION_FAILURE
      ]
  }
})

export const getBidpacks = () => ({
  [RSAA]: {
      endpoint: API_ROOT + '/api/bidpacks/',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      types: [
        BIDPACK_LIST_REQUEST, BIDPACK_LIST_SUCCESS, BIDPACK_LIST_FAILURE
      ]
  }
})

export const postBidpackToCart = (unique_id) => ({
  [RSAA]: {
      endpoint: API_ROOT + '/api/bidpacks/buy/',
      method: 'POST',
      headers: withAuth({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({"unique_id":unique_id}),
      types: [
        POST_BIDPACK_REQUEST, POST_BIDPACK_SUCCESS, POST_BIDPACK_FAILURE
      ]
  }
})

export const retrieveCurrentAuctions = () => ({
  [RSAA]: {
    endpoint: API_ROOT + '/api/auction/live/',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    types: [
      CURRENT_AUCTIONS_REQUEST, CURRENT_AUCTIONS_SUCCESS, CURRENT_AUCTIONS_FAILURE
    ]
  }
})

export const retrievePastAuctions = () => ({
  [RSAA]: {
    endpoint: API_ROOT + '/api/auction/past/',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    types: [
      PAST_AUCTIONS_REQUEST, PAST_AUCTIONS_SUCCESS, PAST_AUCTIONS_FAILURE
    ]
  }
})
