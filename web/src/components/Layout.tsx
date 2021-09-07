import Link from "next/link";
import React from "react";
import Footer from "./Footer";

export function Layout({ children }) {
  return (
    <div className="bg-gray-900 min-h-screen relative flex flex-col items-center overflow-hidden">
      <div className="w-full bg-gray-800 border-b border-gray-500 mb-12">
        <div className="max-w-4xl px-8 py-4 mx-auto flex w-full justify-between items-center">
          <div >
            <Link href="/">
              <a className="flex items-center">
                <img src={"/chopper.svg"} className="w-16" />
                <div className="text-2xl font-light mx-8">MediaChopper</div>
              </a>
            </Link>
          </div>
          <div className="flex items-center gap-16">
            <Link href="/blog">
              <a className="text-sm hover:underline ">Blog</a>
            </Link>

            <Link href="/#download">
              <a className="font-semibold text-white bg-blue-600 px-4 py-2 rounded shadow text-sm ">Download now</a>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full">
        <main className="flex mx-auto w-full items-center max-w-4xl px-8 flex-col">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
