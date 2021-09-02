import PlausibleProvider from "next-plausible";
import Head from "next/head";
import "notyf/notyf.min.css";
import React from "react";
import { SWRConfig } from "swr";
import "../styles.css";
import "../tailwind.css";
import { fetcher } from "../utils/request";
// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'

function MyApp({ Component, pageProps, config }) {
  return (
    <>
      <SWRConfig
        value={{
          revalidateOnFocus: true,
          revalidateOnMount: true,
          revalidateOnReconnect: false,
          fetcher: fetcher,
        }}
      >
        <PlausibleProvider domain="mediachopper.io">
          <Head>
            <meta property="og:site_name" content="PostCut" />
          </Head>

          <div className="min-h-screen">
            <Component {...pageProps} />
          </div>
        </PlausibleProvider>
      </SWRConfig>
    </>
  );
}

export default MyApp;
