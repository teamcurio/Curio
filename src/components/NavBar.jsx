import React from "react";
import { useState, useEffect } from "react";
import { Link, Route, useHistory } from "react-router-dom";


import {
  Button,
  Flex,
  Spacer,
  InputGroup,
  InputRightElement,
  Box,
  Input,
  Stack,
  FormLabel,
  Grid,
  GridItem,
} from "@chakra-ui/react";



const NavBar = () => {

  const history = useHistory();

  const [searchValue, setSearchValue] = useState("");
  const handleSearchValue = (e) => setSearchValue(e.target.searchValue);
  const [isLoggedIn, setLogin] = useState(Boolean(localStorage.getItem('curioUser')))

  // useEffect(, isLoggedIn)

  const handleSubmitSearch = () => {
    let data = new URLSearchParams();
    data.append("searchValue", searchValue);

    fetch("/search", {
      method: 'post',
      body: data
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonData) {
        console.log(jsonData);
      })
      .catch(function (error) {
        console.log(error);
      });
    // (C) PREVENT HTML FORM SUBMIT
    return false;
  };

  const handleLogout = () => {
    localStorage.removeItem('curioUser');
    setLogin()
    history.push('/');
  }

console.log(localStorage.getItem('curioUser'))
  return (
    <Flex justifyContent='center'>
    
     {/* !localStorage.getItem('curioUser') &&  */}


    
      {/*<Spacer />
      <Box>
        <Button type="submit" colorScheme="blue">
          Genres
        </Button>
      </Box>
      <Spacer />
      <Spacer /> */}
      {/* <Box>
        <form onSubmit={handleSubmitSearch}>
          <InputGroup size="md" pr="4.5rem">
            <Input
              pr="4.5rem"
              placeholder="Search Term"
              name="search"
              onChange={handleSearchValue}
            />
            <InputRightElement width="4.5rem">
              <Button type="submit" colorScheme="blue" >
                Search
              </Button>
            </InputRightElement>
          </InputGroup>
        </form>
      </Box> */}
      <Spacer />
      <Box position='fixed' width='100%' color='white' h='40px' bg='black' border='solid' borderBottomRadius='15px'>
      {localStorage.getItem('curioUser') && (<Link to='/favorites'>
      <Button float='left' type="submit" bg='black' color='white' justifyContent='center' height='30px' _hover={{ background: 'lightgray', color: 'black' }}>
        Favorites
      </Button>
      </Link>)}
        {/* <NavBar /> */}
        {/* </Box> */}
        {/* <Box> */}
        {!localStorage.getItem('curioUser') ? (
        <Link to="/login">
          <Button float='right' type="submit" bg='black' color='white' justifyContent='center' height='30px' _hover={{ background: 'lightgray', color: 'black' }} >
            Log In
        </Button>
        </Link>) : 
        (  
        <Link to="/">
        <Button onClick={()=>handleLogout()} float='right' type="submit" bg='black' color='white' justifyContent='center' height='30px' _hover={{ background: 'lightgray', color: 'black' }} >
          Sign Out
      </Button>
      </Link>)}
        {/* <Box>
      <Stack spacing={4} direction="row" align="center" padding="0">
    <Link to="/signup">
      <Button
        border="2px"
        borderColor="teal.500"
        colorScheme="teal"
        variant="solid"
      >
        Sign up
      </Button>
    </Link>
    <Link to="/login">
      <Button
        border="2px"
        borderColor="purple"
        colorScheme="purple"
        variant="solid"
      >
        Login
      </Button>
    </Link>
        </Stack> */}
      </Box>
    </Flex>

  );
};

export default NavBar;
