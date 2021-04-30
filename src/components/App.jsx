// imports
import React, {Component} from 'react';


import NavBar from './NavBar';
import SignOnPage from './SignOnPage';

class App extends Component{
  render() {
    return(
    <div>
      <NavBar/>
      <SignOnPage/>
    </div>
    )   
  }
}

export default App;