import React from 'react'
import { connect } from 'react-redux'
import BannerView from '../components/BannerView'
import {authErrors, isTempAuthenticated, getUserName} from '../reducers'
import { compose } from 'recompose'

const Banner = (props) => {
  return (
    <BannerView {...props}></BannerView>
  )
}

const mapStateToProps = (state) => ({
  isLoggedIn: isTempAuthenticated(state)
})

export default compose(
  connect(mapStateToProps)
)(Banner)
