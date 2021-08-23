import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { FaSpinner } from "react-icons/fa";

export default function ColorButton({
  onClick = null,
  disabled = false,
  light=false,
  icon = null,
  children = null,
  className = "",
  loading = false, 
  linkTo = null,
}) {
  const Comp = linkTo ? "a" : "button";
  const bgColor = light ? "bg-white" : "bg-gray-900"
  const borderColor = light ? "border-gray-700" : "border-gray-300"
  const borderColorHover = light ? "hover:border-gray-900" : "hover:border-gray-50"

  const isDisabled = disabled || loading;
  const inside = (
    <Comp
      className={clsx(
        className,
        `flex center border ${borderColor} ${bgColor} rounded py-2 px-4 text-sm`,
        !isDisabled && `${borderColorHover} transition-colors duration-150 hover:shadow-sm`,
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

  // <button
  //         type="button"
  //         className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
  //         onClick={onClose}
  //       >
  //         Cancel
  //       </button>

  if (linkTo) {
    return <Link href={linkTo}>{inside}</Link>;
  }

  return inside;
}
