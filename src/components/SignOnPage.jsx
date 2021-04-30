import React, { useState } from 'react';
import {
  Button,
  Input,
  Link,
  Grid,
  GridItem,
  Box,
  Container,
  Switch,
  FormControl,
  FormLabel,
  Text
} from '@chakra-ui/react';
// import { ToggleButtonGroup, ToggleButton, Alert } from '@chakra-ui/core';
// import { ThemeProvider, makeStyles } from '@chakra-ui/core/styles';
import UseInputState from './useInputState';


//STYLING:
// const useStyles = makeStyles(theme => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },

//   form: {
//     width: '100%',
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

//SignIn_SignUp COMPONENT:
const Signon = ({ history }) => {
  const [user_name, handleUsername] = UseInputState('');
  const [password, handlePassword] = UseInputState('');
  const [email, handleEmail] = UseInputState('');
  const [warn, setWarn] = useState(false);
  const [nameExists, setNameExists] = useState(null);
  const [hasAccount, setHasAccount] = useState(true);
  // const classes = useStyles();

  const handleSubmit = async e => {
    e.preventDefault();

    const body = hasAccount
      ? { user_name, password }
      : { user_name, email, password };
    console.log('body==>', body);

    try {
      const response = await fetch(
        hasAccount ? '/auth/signin' : '/auth/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      );

      let data = await response.json();

      if (!data.err) {
        console.log(hasAccount ? 'Signed In!' : 'Signed Up!');
        console.log('data in sign up', data);
        //redirect to Home
        //set the token in local storage
        localStorage.setItem(`${(user_name.charAt(0).toUpperCase() + user_name.slice(1))}`, data.token);
        history.push(`/dashboard/${user_name}`);
      } else {
        setWarn(true);
        setTimeout(() => {
          setWarn(false);
        }, 2000);
      }
    } catch (error) {
      console.log(`Error in handleSubmit of Signon component`, error);
    }
  };

  const handleClick = async e => {
    e.preventDefault();

    const body = { user_name };
    console.log('body==>', body);

    try {
      const response = await fetch('/auth/checkusername', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      console.log('response.status => ', response.status);

      // json the response, check if that response has an error, instead of checking for status 200

      if (response.status === 200) {
        const data = await response.json();
        console.log('data => ', data);

        setNameExists(data);

        setTimeout(() => {
          setNameExists(null);
        }, 2000);
      } else {
        setWarn(true);

        setTimeout(() => {
          setWarn(false);
        }, 2000);
      }
    } catch (error) {
      console.log('Error in handleClick of Signon component:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
        <div >
          Welcome!
          <form noValidate onSubmit={handleSubmit}>
            <Input
              variant="outlined"
              margin="normal"
              required
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={user_name}
              onChange={handleUsername}
            />
            {!hasAccount &&
              (nameExists === null ? (
                <Button
                  onClick={handleClick}
                  variant="contained"
                  color="secondary"
                  style={{ fontWeight: '700' }}
                >
                  Check Availability
                </Button>
              ) : nameExists ? (
                <Alert severity="error">Username Already Exist!</Alert>
              ) : (
                    <Alert severity="success">Username Is Available!</Alert>
                  ))}

            {!hasAccount && (
              <Input
                variant="outlined"
                margin="normal"
                required
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={handleEmail}
              />
            )}
            <Input
              variant="outlined"
              margin="normal"
              required
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handlePassword}
            />
            {hasAccount ? (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ fontWeight: '700' }}
              >
                {' '}
                Sign In
              </Button>
            ) : (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  style={{ fontWeight: '700' }}
                >
                  {' '}
                Sign Up
                </Button>
              )}
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="sign_up" mb="0">
                  Need to sign up instead? 
                </FormLabel>
                <Switch id="sign_up" onChange={(event) => {
                  setHasAccount(!hasAccount);
            }}/>
              </FormControl>
            <Grid>
              <GridItem>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </GridItem>
              {/* <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid> */}
            </Grid>
          </form>
        </div>
        <Box mt={3} style={{paddingBottom: "10px"}}>
          <Copyright />
        </Box>
        {warn && (hasAccount ? (<Alert severity="error" >Invalid Username or Password.</Alert>): (<Alert severity="warning" >Sign Up Not Complete. Please Try Again.</Alert>))}
    </Container>
  );
};

function Copyright() {
  return (
    <Text variant="body2" color="textSecondary" align="center">
      {'Copyright © Curio'} {new Date().getFullYear()}
      {'.'}
    </Text>
  );
}

export default Signon;
