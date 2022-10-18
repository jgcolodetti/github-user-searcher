import React from "react";
import Router from "./routes/Router";
import { ChakraProvider } from '@chakra-ui/react'
import GlobalState from "./components/global/GlobalState";


function App() {

  return (
    <div>
      <GlobalState>
        <ChakraProvider>
          <Router />
        </ChakraProvider>
      </GlobalState>
    </div>
  );
}

export default App;
