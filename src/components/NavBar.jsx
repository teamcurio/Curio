import React, {Component} from 'react';
import { 
  Button
  , Flex
  , Spacer
  , InputGroup,
  InputRightElement
  , Box } from "@chakra-ui/react"

class NavBar extends Component {
  render() {
    // Title 
    // Favorites
    return(
    <Flex>
      <Box>
        <Button colorScheme="blue">Favorites</Button>
      </Box>
    <Spacer />
      <Box>
        <Button colorScheme="blue">Genres</Button>
      </Box>
    <Spacer />
      <Box>Curio</Box>
    <Spacer />
    <Box>
    <InputGroup size="md" pr="4.5rem">         
        <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={()=>console.log('hi')}>
          Search
        </Button>
        </InputRightElement>
      </InputGroup>
    </Box>
    <Spacer />
      <Box> 
        <Button colorScheme="blue">Log in / Log out</Button>
      </Box>
    </Flex>
  )
  }
}

export default NavBar;