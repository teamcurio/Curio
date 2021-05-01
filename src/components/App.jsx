// imports
import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';


import NavBar from './NavBar';
import SignIn from './SignInPage';

class App extends Component{

  render() {
    return(
    <div>
      <Switch>
      <Route exact path='/' component={NavBar}/>
      {/* <Route path="/signin" component ={SignIn}/> */}
      </Switch>
    </div>
    )   
  }
}

export default App;