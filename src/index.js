import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import App from './components/App';
import theme from "./theme";

render(
  <ChakraProvider>
    <BrowserRouter>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </BrowserRouter>
  </ChakraProvider>,
  document.getElementById('root'));
