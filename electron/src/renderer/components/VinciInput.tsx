import clsx from "clsx";
import React from "react";
export function VinciInput({ disabled = false, ...props }) {
  return (
    <input
      type="text"
      {...props}
      disabled={disabled}
      className={clsx(
        "flex-1 border border-black text-xs text-gray-300 rounded-sm bg-gray-700 h-7 px-1",
        "focus:outline-none focus:border-red-600 focus:text-white",
        disabled ? "cursor-not-allowed" : "cursor-text"
      )}
    />
  );
}
