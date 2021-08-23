import React from "react";
import Footer from "./Footer";
import Nav from "./Nav";

export function Layout({ children, dark = true }) {
  return (
    <div className="bg-gray-900 min-h-screen relative overflow-hidden">
      <Nav dark={dark} />
      <main className="flex items-center flex-col">{children}</main>
      <Footer />
    </div>
  );
}
