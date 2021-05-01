// imports
import React, {Component} from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import NavBar from './NavBar';
import Images from './Images';

const client = new ApolloClient({
  uri: 'http://localhost:3434/graphql'
});

class App extends Component{
  render() {
    return(
    <ApolloProvider client={client}>
      {/* // navbar component */}
      <NavBar/>
      <Images />
      {/* // display component */}
      {/* // description component */}
      {/* // footer */}
    </ApolloProvider>
    )   
  }
}

export default App;