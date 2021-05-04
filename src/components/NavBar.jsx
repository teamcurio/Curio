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
  Stack,
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
    <Flex>
      <Box>
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
      <Box>Curio</Box>
      <Spacer />
      <Box>
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
      </Box>
      <Spacer />
      <Box>
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
  </Stack>
      </Box>
    </Flex>

  );
};

export default NavBar;
