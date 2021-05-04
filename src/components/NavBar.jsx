import React from "react";
import { useState } from "react";
import { Link, Route } from "react-router-dom";


import {
  Button,
  Flex,
  Spacer,
  InputGroup,
  InputRightElement,
  Box,
  Input,
  FormLabel,
  Grid,
  GridItem,
} from "@chakra-ui/react";

const NavBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const handleSearchValue = (e) => setSearchValue(e.target.searchValue);

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

  return (
    <Flex justifyContent='center'>
      {/* <Box>
        <Button type="submit" colorScheme="blue">
          Favorites
        </Button>
      </Box>
      <Spacer />
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
        {/* <NavBar /> */}
        {/* </Box> */}
        {/* <Box> */}
        <Link to="/login">
          <Button float='right' type="submit" bg='black' color='white' justifyContent='center' height='30px' _hover={{ background: 'lightgray', color: 'black' }} >
            Log In
        </Button>
        </Link>
      </Box>
    </Flex>

  );
};

export default NavBar;
