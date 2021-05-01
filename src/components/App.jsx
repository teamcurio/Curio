// imports
import React, {Component} from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import NavBar from './NavBar';
import Images from './Images';
import SignIn from './SignInPage';
import { Switch, Route } from 'react-router-dom';

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql'
});
class App extends Component {
  render() {
    return(
    <ApolloProvider client={client}>
      {/* // navbar component */}
        <NavBar />
        <div className='router'>
          <Switch>
            <Route exact path="/signin" component={SignIn} />
          </Switch>
        </div>
      <Images />
      {/* // display component */}
      {/* // description component */}
      {/* // footer */}
    </ApolloProvider>
    )   
  }
}

export default App;
