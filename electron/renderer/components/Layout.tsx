import clsx from "clsx";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { useState } from "react";
import { FaBook, FaHelicopter, FaHome } from "react-icons/fa";

export default function Layout({ children }) {
  const tabs = [
    {
      title: "Home",
      path: "/home",
      icon: FaHome,
    },
    {
      title: "Instructions",
      path: "/instructions",
      icon: FaBook,
    },
    {
      title: "Chopper",
      path: "/chopper",
      icon: FaHelicopter,
    },
  ];
  const [currentTab, setCurrentTab] = useState(0);

  const router = useRouter();

  console.log("router.pathname: ", router.pathname);
  return (
    <div className="h-screen max-h-screen  flex flex-col">
      <div className="flex-1 overflow-y-scroll">{children}</div>
      <footer className="h-12 flex-shrink-0 bg-gray-900  border-t-2 border-black flex justify-center">
        {tabs.map((t) => {
            const active = router.pathname == t.path
            return (
          <Link href={t.path}>
            <button
              className={clsx(
                "w-36 h-full flex flex-col border-b-2 justify-around pt-1 items-center text-xs ",
                active ? " border-red-600" : "border-transparent"
              )}
            >
              <t.icon size={16} className={clsx("", active ? "text-gray-50" : "text-gray-500")} />
              <div className={clsx("", active ? "text-gray-50" : "text-gray-400")}>{t.title}</div>
            </button>
          </Link>
        )})}
      </footer>
    </div>
  );
}
