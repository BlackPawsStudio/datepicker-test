import { ButtonHTMLAttributes } from "react";

export const ArrowButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={`w-3 h-3 -rotate-45 p-0 border-2 border-gray-200 border-r-transparent border-b-transparent bg-transparent hover:scale-110 active:scale-90 ${
        props.className ? props.className : ""
      }`}
    >
      {props.children}
    </button>
  );
};
