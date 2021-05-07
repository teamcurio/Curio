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
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchTerm = (e) => setSearchTerm(e.target.value);

  return (
    <div>
      <NavBar displaySearch={false}/>
      <Flex justifyContent="center" h='100vh' backgroundImage='url(https://images.metmuseum.org/CRDImages/as/original/DP251139.jpg)'>
        <VStack margin='auto' spacing={1} direction="row" align="center" padding="4">
          <Heading margin='auto' size='4xl'>Curio</Heading>
          <Text>A personally curated art experience</Text>
          <Box>
            <form >
              <InputGroup className='inputTerm' size="md" pr="4.5rem">
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
          </Box>
        </VStack>
      </Flex>
    </div >
  )
}
export default LandingPage;