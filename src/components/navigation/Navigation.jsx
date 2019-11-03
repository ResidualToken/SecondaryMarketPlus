import React, { Component } from 'react';
import {authErrors, isTempAuthenticated, getUserName, getCartInfo, getBids} from '../../reducers'
import { getCart, getBidCount } from '../../actions/profile'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withFirebase } from '../../components/Firebase';

import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBContainer, MDBIcon } from "mdbreact";

class NavigationView extends Component {

  state = {
    collapseID: ""
  };

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {

    } else {
      console.log("LOG IN")
    }
  }

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
    collapseID: prevState.collapseID !== collapseID ? collapseID : ""
  }));

  logout(e) {
    e.preventDefault();
    if(e.currentTarget.getAttribute('name')=="logout"){
      localStorage.clear();
      window.location.reload();
    }
  }

  login(e) {
    e.preventDefault();
    window.location = '/login'
  }

  render() {
    let cartNumber = 0
    let dropdownField = (
      <span></span>
    )
    let cartField = (
      <span></span>
    )

    if (this.props.isAuthenticated) {
      let dropdownMenu = (
        <MDBDropdownMenu className="dropdown-default" right>
          <MDBDropdownItem href="#" name="logout" onClick={this.logout}> <i className="fa fa-sign-out" style={{paddingRight:5}}></i>Log Out</MDBDropdownItem>
        </MDBDropdownMenu>
      )
    }

    return (
      <header className="navbar-space" >
        <MDBNavbar color="mdb-color darken-3" fixed="top" expand="md">
          <MDBNavbarBrand>
            <a href="/">
              <img src="https://static.wixstatic.com/media/1eeaf4_6b7e3017e739424e9cf8b8afec9a5875~mv2.jpg/v1/fill/w_112,h_80,al_c,q_80,usm_0.66_1.00_0.01/1eeaf4_6b7e3017e739424e9cf8b8afec9a5875~mv2.webp" className="z-depth-0"
              style={{ height: 35, padding: 0 }} alt="" />
            </a>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={this.toggleCollapse("navbarCollapse3")} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.collapseID} navbar>
            <MDBNavbarNav left>
              <MDBNavItem active>
                <MDBNavLink className="white-text" to="/">Home</MDBNavLink>
              </MDBNavItem>
            </MDBNavbarNav>
            <MDBNavbarNav right>
              <MDBNavItem>
                <MDBNavLink className="white-text" to="/">Who We Are</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBDropdown>
                  <MDBDropdownToggle nav caret>
                    <div className="d-md-inline">Seller Tools</div>
                  </MDBDropdownToggle>
                  <MDBDropdownMenu className="dropdown-default" right>
                    <MDBDropdownItem href="/seller#upload">Import Tape</MDBDropdownItem>
                    <MDBDropdownItem href="/seller#load">Load To Web</MDBDropdownItem>
                    <MDBDropdownItem href="/seller#remove">Remove From Web</MDBDropdownItem>
                    <MDBDropdownItem href="/seller#accept">Accept Contact</MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink className="white-text" to="/">Collateral Security</MDBNavLink>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
      </header>
    )
  }
}

const Navigation = (props) => {
  return (
    <NavigationView {...props}></NavigationView>
  )
}

const mapStateToProps = (state) => ({
  errors: authErrors(state),
  isAuthenticated: isTempAuthenticated(state),
  username: getUserName(state),
  cartInfo: getCartInfo(state),
  bids: getBids(state)
})

const mapDispatchToProps = (dispatch) => ({
  getCart: () => {
    return dispatch(getCart())
  },
  retrieveBids: () => {
    return dispatch(getBidCount())
  }
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFirebase
)(Navigation)
