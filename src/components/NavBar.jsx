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
  IconButton,
  Text
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
      <Flex width='100%' color='white' h='40px' bg='black' border='solid' borderBottomRadius='15px' justifyContent='center' style={{marginTop: "0px"}}>
        {localStorage.getItem('curioUser') ? (<Link to='/favorites'>
          <Button float='left' type="submit" bg='black' color='white' justifyContent='center' height='30px' _hover={{ color: '#ebc765' }}>
            Favorites
        </Button>
        </Link>) :  <Link to='/'><Button float='left' type="submit" bg='black' color='white' justifyContent='center' height='30px' _hover={{ color: '#ebc765' }}>
            {''}Curio
        </Button>
        </Link>}
        <Spacer />
        <Spacer />
        {props.displaySearch &&
          <Stack direction={['column', 'row']}>
            <Input _placeholder={{ color: 'black' }}
              align='center'
              pr="4.5rem"
              name="search"
              borderColor='white'
              bg='white'
              color='white'
              placeholder='Enter Search Term'
              onChange={handleSearchTerm}
              size='xs'
              mt='5px'
            />
            <Link to={{ pathname: "/images", state: { searchTerm } }} >
              <IconButton size='sm' colorScheme='blackalpha' type='submit' aria-label="search" icon={<SearchIcon />} />
            </Link>
          </Stack>
        }
        <Spacer></Spacer>
        <Spacer></Spacer>
        {!isLoggedIn ? (
          <Link to="/login">
            <Button float='right' type="submit" bg='black' color='white' justifyContent='center' height='30px' _hover={{ color: '#ebc765' }} >
              Log In
          </Button>
          </Link>) :
          (
            <Link to="/">
              <Button onClick={() => handleLogout()} float='right' type="submit" bg='black' color='white' justifyContent='center' height='30px' _hover={{ color: '#ebc765' }} >
                Sign Out
        </Button>
            </Link>)}
      </Flex>
    );
};

export default NavBar;
