import app from 'firebase/app';
import 'firebase/database';

const prodConfig = {
  apiKey: "AIzaSyBNObqkDeVXI11vJYsndLRcvbC_Mmd",
  authDomain: "https://residual-webapp.firebaseio.com/",
  databaseURL: "https://residual-webapp.firebaseio.com/",
  projectId: "residual-webapp"
};

const devConfig = {
  apiKey: "AIzaSyBNObqkDeVXI11vJYsndLRcvbC_Mmd",
  authDomain: "https://residual-webapp.firebaseio.com/",
  databaseURL: "https://residual-webapp.firebaseio.com/",
  projectId: "residual-webapp"
};

// additional env parameters
// NOTE: make .env file for these vars!
// apiKey: process.env.REACT_APP_API_KEY,
// authDomain: process.env.REACT_APP_AUTH_DOMAIN,
// databaseURL: process.env.REACT_APP_DATABASE_URL,
// projectId: process.env.REACT_APP_PROJECT_ID,
// storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
// messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,

const config =
  process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.db = app.database();
  }
  auction = (id) => {
    return this.db.ref('auctions/'+id)
  }
  auctions = () => this.db.ref('auctions')
  pastauctions = () => this.db.ref('pastauctions')
  pennyauctions = () => this.db.ref('pennyauctions')
}

export default Firebase;
