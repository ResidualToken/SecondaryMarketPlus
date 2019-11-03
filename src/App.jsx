import React, { Component } from 'react';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from "history";
import { Route, Switch } from 'react-router'
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';

import './index.css';
import './AppLegacy.css';
import 'bootstrap/dist/css/bootstrap.css';

import Home from './pages/Home';
import SellerDashboard from './pages/SellerDashboard';

//retrieve your store & persistor
const { store, persistor } = configureStore();

const history = createBrowserHistory();

// const history = createHistory()

class IdxComponent extends Component {

  render() {

    const responseFacebook = (response) => {
      console.log(response);
      // axios.post("http://localhost:8000/api/login/social/jwt-pair", {
      //   "provider":"facebook",
      //   "code":response.accessToken
      // }).then((res) => {
      //   console.log(res)
      //   console.log("LOGIN SUCCESS")
      // }).catch((err) => {
      //   console.log(err)
      //   console.log("ERR SUCCESS")
      // })
    }

    return (
      <div>
        <FacebookLogin
          appId="590651201439079"
          fields="name,email"
          callback={responseFacebook}
        />
      </div>
    )
  }
}

//(/a) is for product auction
//(/p) is for product sale
//(/s) is for silent auction

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/home" component={Home}/>
            <Route path="/seller" component={SellerDashboard}/>
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
