import Link from "next/link";
import React from "react";
import Footer from "./Footer";

export function Layout({ children }) {
  return (
    <div className="bg-gray-900 min-h-screen relative flex flex-col items-center overflow-hidden">
      <div className="w-full bg-gray-800 border-b border-gray-500 mb-12">
        <div className="max-w-4xl px-8 py-4 mx-auto flex w-full justify-between items-center">
          <div className="flex items-center">
            <Link href="/"><a><img src={"/chopper.svg"} className="w-16" /></a></Link>
            <div className="text-2xl font-light mx-8">
              MediaChopper
            </div>
          </div>
          <a className="font-semibold mt-2 text-red-300">Download now</a>
        </div>
      </div>
      <div className="w-full">
        <main className="flex mx-auto w-full items-center max-w-4xl px-8 flex-col">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
