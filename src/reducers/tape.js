import jwtDecode from 'jwt-decode'
import * as tape from '../actions/tape'

const initialState = {
  tape: ""
}

export default (state=initialState, action) => {
  switch(action.type) {
    case tape.TAPE_GET_REQUEST:
      return {
        ...state,
        tape: action
      }
    case tape.TAPE_GET_SUCCESS:
      return {
        ...state,
        tape: action.payload,
      }
    case tape.TAPE_GET_FAILURE:
      return {
        ...state,
        tape: "ERROR"
      }
    default:
      return state
  }
}

export function getTape(state) {
  if (state.tape) {
    return state.tape
  } else {
    return undefined
  }
}
