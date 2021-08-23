import clsx from "clsx";
import React from "react";
export function VinciButton({ onClick, children, disabled=false }) {
  return (
    <button
      className={clsx(
        "rounded-xl border text-xs border-gray-600 text-gray-300 px-4 py-1",
        !disabled && "hover:text-white hover:border-white",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        disabled ? "text-gray-500" : "text-gray-300"
      )}
      onClick={disabled ? () => {} : onClick}
    >
      {children}
    </button>
  );
}
