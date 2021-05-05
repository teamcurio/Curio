import React from 'react';
import { render } from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import { ChakraProvider } from "@chakra-ui/react";
import App from './components/App';

render(<ChakraProvider><BrowserRouter><App /></BrowserRouter></ChakraProvider>, document.getElementById('root'));
