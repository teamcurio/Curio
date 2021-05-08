import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './CurioLandingPage';
import LogIn from './LogInPage';
import SignUp from './SignUpPage';
import NavBar from './NavBar';
import ImageContainer from './ImageContainer';
import favorites from './favorites';
import FavoritesContainer from "./FavoritesContainer";

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql'
});


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className='router'>
          <Switch>
            <Route path='/' exact component={LandingPage} />
            <Route exact path="/login" component={LogIn} />
            <Route exact path='/images' component={ImageContainer} />
            <Route exact path='/favorites' component={FavoritesContainer} />
            <Route exact path='/signup' component={SignUp} />
          </Switch>
        </div>
      </ApolloProvider>
    )
  }
}

export default App;
