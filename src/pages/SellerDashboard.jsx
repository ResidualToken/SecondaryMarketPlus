import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MDBContainer, MDBRow, MDBCol, MDBListGroup, MDBListGroupItem, MDBBadge, MDBTable, MDBTableBody, MDBTableHead, MDBBtn
, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInputGroup } from 'mdbreact'
import { Line } from "react-chartjs-2";
import Footer from '../containers/Footer'
import FooterEnd from '../containers/FooterEnd'
import Navigation from '../components/navigation/Navigation'

import web3 from '../utilities/Web3';
import storehash from '../utilities/Storehash';
import ipfs from '../utilities/Ipfs';

export const SellerDashboard = (props) => {
  //do something here
  return (
    <div  className="r-home">
      <Navigation></Navigation>
      <SellerDashboardView></SellerDashboardView>
      <Footer></Footer>
    </div>
  )
}

class SellerDashboardView extends Component {
  state = {
    ipfsHash: null,
    buffer: '',
    ethAddress: '',
    transactionHash: '',
    txReceipt: ''
  };

  //Take file input from user
  captureFile = (event) => {
    event.stopPropagation()
    event.preventDefault()
    const file = event.target.files[0]
    let reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => this.convertToBuffer(reader)
  };

  //Convert the file to buffer to store on IPFS
  convertToBuffer = async (reader) => {
    //file is converted to a buffer for upload to IPFS
    const buffer = await Buffer.from(reader.result);
    //set this buffer-using es6 syntax
    this.setState({ buffer });
  };

  onClick = async () => {
    try {
      this.setState({ blockNumber: "waiting.." });
      this.setState({ gasUsed: "waiting..." });
      await web3.eth.getTransactionReceipt(this.state.transactionHash, (err, txReceipt) => {
        console.log(err, txReceipt);
        this.setState({ txReceipt });
      });
    }
    catch (error) {
      console.log(error);
    }
  }
  onSubmit = async (event) => {
    event.preventDefault();

    //bring in user's metamask account address
    const accounts = await web3.eth.getAccounts();
    //obtain contract address from storehash.js
    const ethAddress = await storehash.options.address;
    this.setState({ ethAddress });
    //save document to IPFS,return its hash#, and set hash# to state
    await window.ethereum.enable();
    console.log('web3.isConnected', web3.eth.isConnected, web3.eth.accounts);
    await ipfs.add(this.state.buffer, (err, ipfsHash) => {
      console.log('ipfsHash', err, ipfsHash, ipfsHash[0].hash);
      //setState by setting ipfsHash to ipfsHash[0].hash
      this.setState({ ipfsHash: ipfsHash[0].hash });
      console.log(web3.utils.asciiToHex('asciiToHex', this.state.ipfsHash));
      console.log(web3.utils.fromAscii('fromAscii', typeof(this.state.ipfsHash), this.state.ipfsHash));
      const ipfs = web3.utils.fromAscii(this.state.ipfsHash);
      const teststring = web3.utils.fromAscii('test');
      // call Ethereum contract method "sendHash" and .send IPFS hash to etheruem contract
      //return the transaction hash from the ethereum contract

      console.log('account', accounts[0], 'ethAddress', ethAddress, ipfsHash);
      storehash.methods.setHash(
        this.state.ipfsHash
      ).send({ from: accounts[0] }, (error, transactionHash) => {
         console.log('error', error, 'transactionHash', transactionHash);
         this.setState({ transactionHash }); });
    })
  };

  render() {
    return (
      <MDBContainer>
        <br />
        <br />
        <div className="App">
          <header className="App-header">
            <h1>Ethereum and IPFS using Infura</h1>
          </header>
          <hr />
          <grid>
            <h3> Choose file to send to IPFS </h3>
            <form onSubmit={this.onSubmit}>
              <input type="file" onChange={this.captureFile} />
              <MDBBtn bsStyle="primary" type="submit">Send it
              </MDBBtn>
            </form>
            <hr />
            <MDBBtn onClick={this.onClick}> Get Transaction Receipt </MDBBtn> <hr />
            <table bordered responsive>
              <thead>
                <tr>
                  <th>Tx Receipt Category</th>
                  <th> </th>
                  <th>Values</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>IPFS Hash stored on Ethereum</td>
                  <td> : </td>
                  <td>{this.state.ipfsHash}</td></tr>
                  <tr>
                    <td>Ethereum Contract Address</td>
                    <td> : </td>
                    <td>{this.state.ethAddress}</td>
                  </tr>
                <tr>
                  <td>Tx # </td>
                  <td> : </td>
                  <td>{this.state.transactionHash}
                 </td>
                </tr>
              </tbody>
            </table>
          </grid>
          <br />
          <br />
        </div>
      </MDBContainer>
    );

  }
}

export default SellerDashboard;
