import React from 'react';
import { RootNavigator } from './src/Routes';
import { isSignedIn, updateLocation, getUserToken } from "./src/helpers/AuthMethods";

const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6Imd1c3Rhdm9tYXJxdWVzLmdtbEBnbWFpbC5jb20iLCJleHAiOjE1Njk4ODk4NzYsImVtYWlsIjoiZ3VzdGF2b21hcnF1ZXMuZ21sQGdtYWlsLmNvbSJ9.RmchKiI0QUvyeCKeL5AsyiTKY3enjWwx8bASSLcrHDc'

class App extends React.Component {
  state = {
    signed: false,
    signLoaded: false,
  }
  componentDidMount(){
    getUserToken()
    .then(token => updateLocation(token))
  }
  componentWillMount(){
    isSignedIn()
    .then(res => {
      this.setState({ signed: res, signLoaded: true })
    })
    .catch(err => alert("Erro"));
  }
  
  render() {
    const { signLoaded, signed } = this.state;
    if (!signLoaded) {
      return null;
    }

    const Layout = RootNavigator(signed);
    return <Layout />;
  }
}

export default App;