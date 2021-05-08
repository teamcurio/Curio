import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import {
  FormHelperText,
  FormControl,
  FormLabel,
  Button,
  Input,
  Container,
  Box,
  Text,
  LightMode,
  Flex,
  useToast,
  Spacer
} from '@chakra-ui/react';
import NavBar from './NavBar';


const LogIn = () => {
  // this sets the current state using the useState hook;
  const [currentUser, setCurrentUserField] = useState({
    email: '',
    password: '',
  });
  // this sets the toast parts according to errors/actions
  const [toastMessage, setToastMessage] = useState(undefined);

  const toast = useToast();
  const history = useHistory();

  useEffect(() => {
    if (toastMessage) {
      toast({
        title: toastMessage.title,
        description: toastMessage.description,
        status: 'warning',
        duration: toastMessage.duration,
        isClosable: true,
        position: 'top',
      });
    }
  }, [toastMessage, toast]);

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setCurrentUserField({ ...currentUser, [name]: value });
  };
  // backend function passed down in props that will take the currentUser as input;

  const handleUserSubmit = (event) => {
    event.preventDefault();
    let title;
    let description;
    let duration;
    console.log('currentUser', currentUser);
    fetch('/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(currentUser),
    })
      .then((res) => {

        return res.json();
      })
      .then((data) => {
        console.log('data', data);
        localStorage.setItem('curioToken', data.token);
        localStorage.setItem('curioUser', data.user);
        history.push('/')
          ;
      })
      .catch((error) => {
        title = 'error';
        description = `${error.err}`;
        duration = 9000;
        // n;
        setToastMessage({ title, description, duration });
      });
  };

  return (
    <>
      <LightMode>
        <NavBar displaySearch={false} />
        <Flex justifyContent="center" h='100vh' backgroundImage='url(https://images.metmuseum.org/CRDImages/as/original/DP251139.jpg)' bgPosition="center">
          <Box>
            <Container
              border="2px solid black"
              margin='auto'
              mt="100px"
              mb="100px"
              maxW="300px"
              py="20px"
              rounded="5%"
              bg='whitesmoke'
              boxShadow="dark-lg"
            >
              <Container marginBottom="1px solid silver" justifyContent="column">
                <form onSubmit={handleUserSubmit}>
                  <FormControl isRequired>
                    <FormLabel>Email:</FormLabel>
                    <Input
                      id="email"
                      onChange={handleInputChange}
                      name="email"
                      borderColor='black'
                      color='black'
                    />
                 
                  </FormControl>
                  <FormControl isRequired mt="10px">
                    <FormLabel>Password:</FormLabel>
                    <Input
                      id="password"
                      onChange={handleInputChange}
                      type="password"
                      name="password"
                      borderColor='black'
                      color='black'
                    />
               
                  </FormControl>
                  <Flex>
                    <Button
                      ml="auto"
                      mr='auto'
                      mt={4}
                      background='#ebc765'
                      color="black"
                      type="submit"
                      _hover={{ color: 'white', background: "black" }}
                    >
                      Log In
              </Button>
                  </Flex>
                </form>
              </Container>
              <Container>
                <Flex mt="15px" justifyContent="center">
                  <Text fontSize="12px" mr="5px">Don't have an account?</Text>
                  <NavLink to="/signup">
                    <Text fontSize="12px" textDecoration="underline">
                      Sign Up
                    </Text>
                  </NavLink>
                </Flex>
              </Container>
              {/* <NavLink to='/'>
                <Text align='center' textDecoration='underline'>
                  Return to Home Page
                </Text>
              </NavLink> */}
            </Container>
          </Box>
        </Flex>
      </LightMode>
    </>
  );
};
export default LogIn;
