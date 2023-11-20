"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Button = ({ lg, md, sm, text, location }: any) => {
  const router = useRouter();
  let btnStyle = "";
  if (lg) {
    btnStyle = "border w-[170px] h-[55px] lg:w-[250px] lg:h-[80px] ";
  } else if (md) {
    btnStyle = "border w-[100px] h-[50px] lg:w-[80px] lg:h-[60px]";
  } else if (sm) {
    btnStyle = "border w-[50px] h-[25px] lg:w-[150px] lg:h-[50px]";
  }
  return (
    <div className="flex items-start">
      <button
        className={btnStyle}
        type="button"
        onClick={() => {
          if (location) {
            router.push(location);
          }
        }}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
