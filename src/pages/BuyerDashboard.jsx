import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact'
import Footer from '../containers/Footer'
import FooterEnd from '../containers/FooterEnd'
import Navigation from '../components/navigation/Navigation'

export const Home = (props) => {
  //do something here
  return (
    <div className="r-home">
      <Navigation></Navigation>
      <HomeView></HomeView>
      <Footer></Footer>
    </div>
  )
}

class HomeView extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol>
            <p>HELLO WORLD</p>
          </MDBCol>
          <MDBCol>
            <p>HELLO WORLD</p>
          </MDBCol>
        </MDBRow>

      </MDBContainer>
    )
  }
}

export default Home;
