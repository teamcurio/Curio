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
  IconButton
} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";



const NavBar = (props) => {
  const history = useHistory();

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchTerm = (e) => setSearchTerm(e.target.value);
  const [isLoggedIn, setLogin] = useState(Boolean(localStorage.getItem('curioUser')))
  

  useEffect(()=> {
    function handleLogStatus() {
      setLogin(Boolean(localStorage.getItem('curioUser')))
    }
  },[isLoggedIn])

  const handleLogout = () => {
    localStorage.removeItem('curioUser');
    localStorage.removeItem('curioToken');
    // handleLogStatus();
    setLogin(Boolean(localStorage.getItem('curioUser')))
    console.log(isLoggedIn);
    history.push('/');
  }

console.log(localStorage.getItem('curioUser'))
  return (
    <Flex justifyContent='center'>
    
   

      <Spacer />
      <Box position='fixed' width='100%' color='white' h='40px' bg='black' border='solid' borderBottomRadius='15px'>
      {localStorage.getItem('curioUser') && (<Link to='/favorites'>
      <Button float='left' type="submit" bg='black' color='white' justifyContent='center' height='30px' _hover={{ background: 'lightgray', color: 'black' }}>
        Favorites
      </Button>
      </Link>)}
      
      {props.displaySearch && 
      <Box>
      <form >
              <InputGroup className='searchTerm' size="md" pr="4.5rem">
                <Input _placeholder={{ color: 'black' }}
                  pr="4.5rem"
                  name="search"
                  borderColor='black'
                  color='black'
                  placeholder='Enter Search Term'
                  onChange={handleSearchTerm}
                />
                <InputRightElement width="4.5rem">
                  <Link to={{pathname: "/images", state: {searchTerm}}} >
                    <IconButton type='submit' aria-label="search" icon={<SearchIcon />} />
                  </Link>
                </InputRightElement>
              </InputGroup>
            </form>
            </Box>} 
        {!isLoggedIn ? (
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
      </Box>
    </Flex>

  );
};

export default NavBar;
