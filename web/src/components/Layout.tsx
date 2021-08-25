import React from "react";
import Footer from "./Footer";

export function Layout({ children }) {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center relative overflow-hidden">
      <div className="max-w-4xl flex flex-col justify-center items-center">
        <img src={"/chopper.svg"} className="w-24 mr-8 mt-4" />
        <div className="text-3xl font-light ">Media<span className="font-bold">Chopper</span></div>
        {/* <div className="font-light mt-2 text-gray-200">Blazingly fast lossless batch splitting.</div> */}
      </div>
      <main className="flex items-center max-w-4xl flex-col">{children}</main>
      <Footer />
    </div>
  );
}
