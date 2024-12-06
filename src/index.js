import React from "react";
import ReactDOM from "react-dom/client";
import RouteHolder from "./router/routeHolder";
import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import ExtendedTheme from "./features/global/css/chakraExtendTheme";
import "primeicons/primeicons.css";
import { PrimeReactProvider } from "primereact/api";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider theme={ExtendedTheme}>
    <PrimeReactProvider>
      <RouteHolder />
    </PrimeReactProvider>
  </ChakraProvider>
);
