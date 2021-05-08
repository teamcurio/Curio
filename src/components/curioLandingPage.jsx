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
  FormControl,
  FormLabel
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons"
import NavBar from './NavBar'

const LandingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchTerm = (e) => setSearchTerm(e.target.value);

  return (
    <div>
      <NavBar displaySearch={false} />

      {/* <Flex justifyContent="center" h='100vh'> */}
      <Flex justifyContent="center" h='100vh' backgroundImage='url(https://images.metmuseum.org/CRDImages/as/original/DP251139.jpg)' bgPosition="center">
        <VStack margin='auto' direction="row"   >
          <Heading margin='auto' size='4xl'>Curio</Heading>
          <Text style={{fontWeight:"bold", padding:"5px"}}>A personally curated art experience</Text>
          <Box>
            <form>
              <InputGroup className='inputTerm' size="md" pr="4.5rem">
                {/* <FormControl isRequired> */}
                {/* <FormLabel>Search</FormLabel> */}
                <Input type='text' isRequired _placeholder={{ color: 'black' }}
                  pr="4.5rem"
                  name="search"
                  borderColor='black'
                  color='black'
                  placeholder='Enter Search Term'
                  onChange={handleSearchTerm}
                  _hover={{ color: 'black' }}
                />
                <InputRightElement width="4.5rem">
                  <Link to={{ pathname: "/images", state: { searchTerm } }} >
                    <IconButton type='submit' aria-label="search" icon={<SearchIcon />} _hover={{ color: '#ebc765' }} bg='black' color="white"/>
                  </Link>
                </InputRightElement>
                {/* </FormControl> */}
              </InputGroup>
            </form>
          </Box>
        </VStack>
      </Flex>

    </div >
  )
}
export default LandingPage;