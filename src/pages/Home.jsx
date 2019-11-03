import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MDBContainer, MDBRow, MDBCol, MDBListGroup, MDBListGroupItem, MDBBadge, MDBTable, MDBTableBody, MDBTableHead, MDBBtn
, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInputGroup, MDBInput } from 'mdbreact'
import { Line } from "react-chartjs-2";
import Footer from '../containers/Footer'
import FooterEnd from '../containers/FooterEnd'
import Navigation from '../components/navigation/Navigation'

export const Home = (props) => {
  //do something here
  return (
    <div  className="r-home">
      <Navigation></Navigation>
      <HomeView></HomeView>
      <Footer></Footer>
    </div>
  )
}

class HomeView extends Component {
  state = {
      pools: [{
        id: 1,
        seller: "Anon",
        date: '11/3/2019',
        type: 'Auto',
        amount: '30000000',
        percent: '9%',
        term: '48',
        hash: 'QmeZDrcJBZhaQsYkofru6rgJ69snRi1g34RnJBTvpwFBnT',
        attest: '7'
      },{
        id: 2,
        seller: "JP Morgan Chase",
        date: '11/2/2019',
        type: 'Student Loans',
        amount: '350000000',
        percent: '5%',
        term: '60',
        hash: 'QmeZDrcJBZhaQsYkofru6rgJ69snRi1g34RnJBTvpwFBnT',
        attest: '10'
      },{
        id: 3,
        seller: "Joes Stuff",
        date: '11/2/2019',
        type: 'Various - Personal',
        amount: '60000',
        percent: '17%',
        term: '200',
        hash: 'QmeZDrcJBZhaQsYkofru6rgJ69snRi1g34RnJBTvpwFBnT',
        attest: '0'

      }],
      modalOpen: false,
      selectedPoolId: -1,
      selectedOfferId: -1,
      mvInput: 0,
      dataLine: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "My First dataset",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(225, 204,230, .3)",
          borderColor: "rgb(205, 130, 158)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(205, 130,1 58)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: "My Second dataset",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(184, 185, 210, .3)",
          borderColor: "rgb(35, 26, 136)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(35, 26, 136)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220, 1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    }
  }

  constructor(props) {
    super(props)
    this.toggleModal = this.toggleModal.bind(this)
    this.toggleOffer = this.toggleOffer.bind(this)
    this.updateMarketInterest = this.updateMarketInterest.bind(this)
    this.Quartile = this.Quartile.bind(this)
    this.Quartile_25 = this.Quartile_25.bind(this)
    this.Quartile_50 = this.Quartile_50.bind(this)
    this.Array_Sort_Numbers = this.Array_Sort_Numbers.bind(this)
    this.Array_Sum = this.Array_Sum.bind(this)
  }

  toggleModal(id) {
    this.setState({"modalOpen":!this.state.modalOpen},()=> {
      if (id > -1) {
        //set id with population
        console.log("SETTING ID")
        this.setState({"selectedPoolId": id - 1})
      }
    })
  }

  toggleOffer(id) {
    this.setState({"offerOpen":!this.state.offerOpen,"selectedOfferId": id - 1},()=> {
    })
  }

  updateMarketInterest(evt) {
    this.setState({"mvInput":evt.target.value})
  }

  Median(data) {
    return this.Quartile_50(data);
  }

  Quartile_25(data) {
    return this.Quartile(data, 0.25);
  }

  Quartile_50(data) {
    return this.Quartile(data, 0.5);
  }

  Quartile_75(data) {
    return this.Quartile(data, 0.75);
  }

  Quartile(data, q) {
    data=this.Array_Sort_Numbers(data);
    var pos = ((data.length) - 1) * q;
    var base = Math.floor(pos);
    var rest = pos - base;
    if( (data[base+1]!==undefined) ) {
      return data[base] + rest * (data[base+1] - data[base]);
    } else {
      return data[base];
    }
  }

  Array_Sort_Numbers(inputarray){
      return inputarray.sort(function(a, b) {
        return a - b;
      });
  }

  Array_Sum(t){
   return t.reduce(function(a, b) { return a + b; }, 0);
  }

  Array_Average(data) {
    return this.Array_Sum(data) / data.length;
  }

  Array_Stdev(tab){
   var i,j,total = 0, mean = 0, diffSqredArr = [];
   for(i=0;i<tab.length;i+=1){
       total+=tab[i];
   }
   mean = total/tab.length;
   for(j=0;j<tab.length;j+=1){
       diffSqredArr.push(Math.pow((tab[j]-mean),2));
   }
   return (Math.sqrt(diffSqredArr.reduce(function(firstEl, nextEl){
            return firstEl + nextEl;
          })/tab.length));
  }

  render() {
    const { pools, selectedOfferId, selectedPoolId } = this.state
    let finalPrice = NaN
    let poolViews = (
      pools.map((pool, idx)=> {
        var fixVal = pool.amount
        var fixString = parseFloat(fixVal).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
        return (
          <MDBListGroupItem key={idx}>
            <MDBTable>
                <MDBTableHead>
                  <tr>
                    <th>Pool #</th>
                    <th>Date Loaded</th>
                    <th>Seller</th>
                    <th>Loan Type</th>
                    <th>Total Balance ($)</th>
                    <th>WAC</th>
                    <th>WART (mos)</th>
                    <th>Attest (%)</th>
                    <th class="text-right">Action</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  <tr>
                    <td>{pool.id}</td>
                    <td>{pool.date}</td>
                    <td>{pool.seller}</td>
                    <td>{pool.type}</td>
                    <td>{fixString}</td>
                    <td>{pool.percent}</td>
                    <td>{pool.term}</td>
                    <td>{pool.attest}</td>
                    <td className="text-right">
                      <MDBBtn onClick={()=>{this.toggleModal(pool.id)}} style={{marginTop: -5}} className="btn btn-sm text-white" color="primary">Evaluate Now</MDBBtn>
                      <MDBBtn onClick={()=>{this.toggleOffer(pool.id)}} className="text-white btn-sm" style={{marginTop: -5}} color="info">Make Offer</MDBBtn>
                    </td>
                  </tr>
                </MDBTableBody>
              </MDBTable>
          </MDBListGroupItem>
        )
      })
    )
    let info = (<div></div>)
    if (selectedOfferId > -1) {
      var fixVal = pools[selectedOfferId].amount
      var fixString = parseFloat(fixVal).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
      info = (
        <div>
        <h6>From: Brandon Burton &lt;bburton.cg@gmail.com&gt;</h6>
        <h6>To Seller: (Anonymous) - {pools[selectedOfferId].date}_{pools[selectedOfferId].type}</h6>
        <hr />
        <MDBRow>
          <MDBCol>
            <h6>{pools[selectedOfferId].type}</h6>
          </MDBCol>
          <MDBCol>
            <h6>{pools[selectedOfferId].date}</h6>
          </MDBCol>
          <MDBCol>
            <h6>{fixString}</h6>
          </MDBCol>
        </MDBRow>
        <hr />
        <MDBInputGroup containerClassName="mb-3" prepend="Bid as % of par:"/>
        <MDBInputGroup prepend="Note" type="textarea" value="To whom it may concern..."/>
        </div>
      )
    } else {
      <p>Loading...</p>
    }
    if (selectedPoolId > -1) {
      //VALIDATE
      var input = this.state.mvInput / 100

      var amount = parseFloat(pools[selectedPoolId].amount)
      var percent = parseFloat(pools[selectedPoolId].percent) / 100.0
      var wart = pools[selectedPoolId].term

      var ip = percent / 12;
      var marketInterestRate = input / 12;

      var pvi = (amount * ip) * ((1 - (Math.pow(1 + marketInterestRate,(-1 * wart))))/marketInterestRate)
      var pvp = (amount * (Math.pow(1 + marketInterestRate,(-1 * wart))))
      var marketValue = ((pvi + pvp) / amount * 100).toFixed(2)
      var finalPriceText = marketValue

      if (input < .01) {
        finalPriceText = "-"
      }

      var weightedCoupon = 0;
      var weightedTerm = 0;
      var sumOutstanding = 0;
      var wacValue = 0;
      var wartValue = 0;
      var idx = 0

      var Papa = require('papaparse')

      Papa.parse("https://gateway.ipfs.io/ipfs/"+this.state.pools[0].hash, {
         download: true,
         step: function(row) {
           var data = row.data

           if (typeof data[3] == "string" && typeof data[4] == "string" && typeof data[6] == "string") {
             if (idx > 0) {
               weightedTerm += parseFloat(data[3]) * parseFloat(data[6])
               weightedCoupon += parseFloat(data[3]) * parseFloat(data[4])
               sumOutstanding += parseFloat(data[3])
             }
           }
           idx += 1
         },
         complete: function(results) {
           wacValue = weightedCoupon / sumOutstanding
           wartValue = weightedTerm / sumOutstanding
           console.log(wacValue)
           console.log(wartValue)
           console.log(sumOutstanding)
         }
      });

      // id: 1,
      // seller: "Anon",
      // date: '11/3/2019',
      // type: 'Auto',
      // amount: '$60,000',
      // percent: '9%',
      // term: '48'


    }
    return (
      <MDBContainer>
        <br />
        <br />
        <h3 className="text-center">Available Loan Pools</h3>
        <p className="text-center">Register today to evaluate these pools.</p>
        <MDBListGroup>
          {poolViews}
        </MDBListGroup>
        <br />
        <br />

        <MDBModal size="lg" className="r-modal-results" isOpen={this.state.modalOpen} toggle={()=>{this.toggleModal(-1)}}>
          <MDBModalHeader toggle={()=>{this.toggleModal(-1)}}>Results</MDBModalHeader>
          <MDBModalBody>
            <MDBRow>
              <MDBCol>
                <h6>Market Value Interest (%)  <MDBInput type="number" onChange={this.updateMarketInterest} value={this.state.input}/></h6>
                <h6>Price: {finalPriceText}</h6>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol>
                <br />
                <h5>Pool Characteristics</h5>
                <MDBTable>
                    <MDBTableHead>
                      <tr>
                        <th>Quartiles</th>
                        <th>Min</th>
                        <th>1st</th>
                        <th>Med</th>
                        <th>3rd</th>
                        <th>Max</th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      <tr>
                        <td>Coupon</td>
                        <td>11.9</td>
                        <td>17.9</td>
                        <td>18</td>
                        <td>18.9</td>
                        <td>22</td>
                      </tr>
                      <tr>
                        <td>Term</td>
                        <td>10</td>
                        <td>24</td>
                        <td>31</td>
                        <td>38</td>
                        <td>46</td>
                      </tr>
                      <tr>
                        <td>Balance</td>
                        <td>10,000</td>
                        <td>10,067</td>
                        <td>10,135</td>
                        <td>10,191</td>
                        <td>10,270</td>
                      </tr>
                    </MDBTableBody>
                  </MDBTable>
                  <br />
                </MDBCol>
                <MDBCol>
                  <img src="https://i.ibb.co/jR2PPVq/Screen-Shot-2019-11-03-at-9-50-07-AM.png" alt="Screen-Shot-2019-11-03-at-9-50-07-AM" border="0" />
                  <h5>Discussion</h5>
                  <img src="https://dlp2gfjvaz867.cloudfront.net/product_photos/15015355/iron_20man-4_original.jpg" width="32" height="32" className="rounded float-left" alt="aligment" /><h6><span style={{marginLeft: 10, marginRight: 10}}></span>This loan pool is great!</h6>
                  <hr />
                  <br />
                  <img src="https://pbs.twimg.com/media/DmsITFPWwAI1pRR.png" width="32" height="32" className="rounded float-left" alt="aligment" /><h6><span style={{marginLeft: 10, marginRight: 10}}></span>Spiderman approves!</h6>
                  <hr />
                  <br />
                  <MDBInputGroup prepend="Comment" type="textarea" />
                  <div class="text-right">
                    <MDBBtn color="primary">Submit</MDBBtn>
                  </div>
                </MDBCol>
            </MDBRow>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn className="text-white" color="primary">Close</MDBBtn>
          </MDBModalFooter>
        </MDBModal>

        <MDBModal className="r-modal-results" isOpen={this.state.offerOpen} toggle={()=>{this.toggleOffer(-1)}}>
          <MDBModalHeader toggle={()=>{this.toggleOffer(-1)}}>Make an offer</MDBModalHeader>
          <MDBModalBody>
            {info}
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn toggle={()=>{this.toggleOffer(-1)}} className="text-white" color="info">Submit</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    )
  }
}

export default Home;
