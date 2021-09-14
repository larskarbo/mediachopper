import React from "react";

export default function VinciFormField({label, children, ...props}) {
  return (
    <div className="flex items-center text-base py-2 gap-2 pr-8  " {...props}>
      <div className="text-gray-400 w-36 text-right flex-shrink-0">
        {label}
      </div>
      {children}
    </div>
  );
}
