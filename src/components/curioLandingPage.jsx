import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Box,
  Stack,
  Text,
  Heading,
  Flex,
  Image,
  Center,
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons"
import NavBar from './NavBar'

const LandingPage = () => {
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
    <div>

        <NavBar />

      <Flex justifyContent="center" h='100vh' backgroundImage='url(https://images.metmuseum.org/CRDImages/as/original/DP251139.jpg)'>
        <VStack margin='auto' spacing={1} direction="row" align="center" padding="4">
          <Heading margin='auto' size='4xl'>Curio</Heading>
          <Text>A personally curated art experience</Text>
          <Box>
            <form onSubmit={handleSubmitSearch}>
              <InputGroup className='inputTerm' size="md" pr="4.5rem">
                <Input _placeholder={{ color: 'black' }}
                  pr="4.5rem"
                  name="search"
                  borderColor='black'
                  color='black'
                  placeholder='Enter Search Term'
                  onChange={handleSearchValue}
                />
                <InputRightElement width="4.5rem">
                  {/* <Button type="submit" bg='black' color='white' >
                    Search
              </Button> */}
                  <Link to="/images">
                    <IconButton type='submit' aria-label="search" icon={<SearchIcon />} />
                  </Link>
                </InputRightElement>
              </InputGroup>
            </form>
          </Box>
          {/* <Stack spacing={4} direction="row" align="center" padding="4"> */}
          {/* <Link to="/signup">
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
        </Link> */}
        </VStack>
        {/* <Box w='100%' h='100%' backgroundImage='url(https://images.metmuseum.org/CRDImages/as/original/DP251139.jpg)'></Box> */}


      </Flex>
    </div >
  )
}
export default LandingPage;