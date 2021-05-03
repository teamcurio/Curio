import React from "react";
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
} from "@chakra-ui/react";

const LandingPage = () => {
  return(
  <Flex justifyContent="center">
  <Stack spacing={4} direction="row" align="center" padding="4">
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
  </Flex>
  )
}
export default LandingPage;