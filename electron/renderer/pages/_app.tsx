import React from "react";
import type { AppProps } from "next/app";

import "../styles/globals.css";
import "../styles/styles.css";
import { ChopperProvider } from "../components/chopper-context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <ChopperProvider>
        <Component {...pageProps} />
      </ChopperProvider>
    </React.Fragment>
  );
}

export default MyApp;
