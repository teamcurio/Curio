// imports
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';


import NavBar from './NavBar';
import SignIn from './SignInPage';

class App extends Component {

  render() {
    return (
      <div>
        <NavBar />
        <div className='router'>
          <Switch>
            <Route exact path="/signin" component={SignIn} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App;