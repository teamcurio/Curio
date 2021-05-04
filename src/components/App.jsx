// imports
import React, {Component} from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import LandingPage from './curioLandingPage';
import CurioHomePage from './CurioHomePage';
import Images from './Images';
import LogIn from './LogInPage';
import SignUp from './SignUpPage';
// import PrivateRoute from './privateRoute';
import { Switch, Route } from 'react-router-dom';


const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql'
});
class App extends Component {
  render() {
    return(
    <ApolloProvider client={client}>
        <div className='router'>
          <Switch>
            <Route path = '/' exact component={LandingPage}/>
            <Route exact path="/login" component={LogIn} />
            <Route exact path='/signup' component={SignUp} />
            {/* <PrivateRoute path='/home' component={CurioHomePage}/> */}
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
