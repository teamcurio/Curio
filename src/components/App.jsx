// imports
import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import LandingPage from './curioLandingPage';
import CurioHomePage from './CurioHomePage';
import Images from './Images';
import LogIn from './LogInPage';
import SignUp from './SignUpPage';
import NavBar from './NavBar';
// import PrivateRoute from './privateRoute';
import { Switch, Route } from 'react-router-dom';
import ImageContainer from './ImageContainer';
import favorites from './favorites';
const arr = [
  { show: "block", url: "https://source.unsplash.com/WLUHO9A_xik/1440x960" },
  { show: "none", url: "https://source.unsplash.com/DNE9iZ1Kqzk/1440x960" },
  { show: "none", url: "https://source.unsplash.com/6ccJQ5qPFvY/1440x960" },
  { show: "none", url: "https://source.unsplash.com/qTLyiHW1nIc/1440x960" },
  { show: "none", url: "https://source.unsplash.com/fxX__3GRtsg/1440x960" }
];
// localStorage.setItem('curioUser', '0001')
const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql'
});
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        {/* <NavBar /> */}
        <div className='router'>
          {/* <CurioHomePage /> */}
          <Switch>
            <Route path='/' exact component={LandingPage} />
            <Route exact path="/login" component={LogIn} />
            <Route exact path='/images' render={(props) => <ImageContainer {...props} imgArr = {arr} />} />
            <Route exact path='/favorites' render={(props) => <ImageContainer {...props} imgArr = {favorites(localStorage.getItem(curioUser))} />} />
            <Route exact path='/signup' component={SignUp} />
          </Switch>
        </div>
        {/* <Images /> */}
        {/* // display component */}
        {/* // description component */}
        {/* // footer */}
      </ApolloProvider>
    )
  }
}

export default App;
