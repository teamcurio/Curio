import React from 'react';

import { ChakraProvider } from "@chakra-ui/react";

import App from './components/App'

render(<ChakraProvider><App /></ChakraProvider>, document.getElementById('root'));
