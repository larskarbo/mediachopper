import electron from "electron";
import Head from "next/head";
import React from "react";
import Layout from "../components/Layout";

function Home() {
  return (
    <Layout>
      <div className="flex flex-col">
        <img src="/logo_dark.svg" className="w-full max-w-md mx-auto my-24" />
      </div>
    </Layout>
  );
}

export default Home;
