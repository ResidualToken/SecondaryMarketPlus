import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import tape, * as fromTape from './tape.js'

export default combineReducers({
  tape: tape,
})

export const getTape = state => tape.getTape(state.tape)

//export const getOrderWizardProducts = state => fromProducts.importOrderProducts(state.products)
