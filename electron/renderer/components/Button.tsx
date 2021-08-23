import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { FaSpinner } from "react-icons/fa";

export default function Button({
  onClick = null,
  disabled = false,
  style = "dark-default",
  icon = null,
  children = null,
  className = "",
  loading = false,
  linkTo = null,
}: {
  [key: string]: any;
  style?: "dark-default" | "light-default" | "gray" | "green";
}) {
  const Comp = linkTo ? "a" : "button";

  let buttonStyles = "";
  let hoverStyles = "";

  if (style == "dark-default") {
    buttonStyles = "border bg-gray-900 border-gray-300";
    hoverStyles = "hover:border-gray-50";
  } else if (style == "gray") {
    buttonStyles = "text-gray-900 bg-gray-100";
    hoverStyles = "hover:bg-gray-200";
  } else if (style == "green") {
    buttonStyles = "text-green-900 bg-green-100";
    hoverStyles = "hover:bg-green-200";
  } else if (style == "light-default") {
    buttonStyles = "text-gray-900 border border-gray-600";
    hoverStyles = "hover:bg-gray-200";
  }

  const isDisabled = disabled || loading;
  const inside = (
    <Comp
      className={clsx(
        className,
        `flex center font-medium ${buttonStyles} rounded-md py-2 px-4 text-sm`,
        !isDisabled && `${hoverStyles} transition-colors duration-150 hover:shadow-sm`,
        isDisabled && "text-gray-400 cursor-default"
      )}
      onClick={isDisabled ? null : onClick}
      disabled={isDisabled}
    >
      <div className=" flex items-center">
        {icon && !loading && <div className="mr-2">{icon}</div>}
        {loading && (
          <div className="mr-1">
            <FaSpinner className="animate-spin" />
          </div>
        )}
        {children}
      </div>
    </Comp>
  );

  if (linkTo) {
    return <Link href={linkTo}>{inside}</Link>;
  }

  return inside;
}
