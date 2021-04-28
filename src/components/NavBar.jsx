import React, {Component} from 'react';
import { 
  Button
  , Flex
  , Spacer
  , Input
  , Box } from "@chakra-ui/react"

class NavBar extends Component {
  render() {
    // Title
    // Favorites
    return(
    <div>
    <Flex>
      <Box>
        <Button colorScheme="blue">Favorites</Button>
      </Box>
      <Spacer />
      // Genres
      <Box>
        <Button colorScheme="blue">Genres</Button>
      </Box>
      // Search
      <Spacer />
        <Box>Curio</Box>
      <Spacer />
      <Bo><
        <InputGroup size="md">
          nputGroup size="md">
            
            pr="4.5rem">
            />
            
            
              utRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
            </Search
        </</Button>
        </</InputRightElement>
        </InputGroup>
      </Box>
        pacg in /
        <Box> 
       Lo n>og out
      <Button colorScheme="blue">Log in / Log out</Button>
      </Box>
    </Flex>
  </div>
  )
  }
}

export default NavBar;