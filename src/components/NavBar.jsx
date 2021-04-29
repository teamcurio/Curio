import React, {Component} from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Button
  , Flex
  , Spacer
  , InputGroup,
  InputRightElement
  , Box, 
  Input
  ,Text
,FormLabel} from "@chakra-ui/react"

const NavBar = () => {
  const { handleSubmit, errors, register, formState } = useForm();
  const [value, setValue] = useState('');

  const onSubmit = (data, e) =>    {
    e.preventDefault();
    console.log('data',data);
  }
  const onError = (errors, e) => console.log('error', error);

    return(
    <Flex>
      <Box>
        <Button type="submit" colorScheme="blue">Favorites</Button>
      </Box>
    <Spacer />
      <Box>
        <Button type="submit" colorScheme="blue">Genres</Button>
      </Box>
    <Spacer />
      <Box>Curio</Box>
    <Spacer />
    <Box>
    <form onSubmit={handleSubmit(onSubmit, onError)}>
    <FormLabel htmlFor="search">Search Term</FormLabel>
    <InputGroup size="md" pr="4.5rem">
      <Input
        pr="4.5rem"
        placeholder="Search Term"
        name='search' 
        // onChange={(event) => setValue(event.currentTarget.value)}
        />         
        <InputRightElement width="4.5rem">
        <Button type="submit" h="1.75rem" size="md" isLoading={formState.isSubmitting} >
          Search
        </Button>
        </InputRightElement>
      </InputGroup>
      </form>
    </Box>
    <Spacer />
      <Box> 
        <Button type="submit" colorScheme="blue">Log in / Log out</Button>
      </Box>
    </Flex>
  )
}

export default NavBar;