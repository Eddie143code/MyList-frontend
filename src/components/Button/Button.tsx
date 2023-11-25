"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Button = ({ lg, md, sm, xs, text, location, type, clickMethod }: any) => {
  const router = useRouter();
  let btnStyle: string = "";
  if (lg) {
    btnStyle = "border w-[170px] h-[55px] lg:w-[250px] lg:h-[80px] ";
  } else if (md) {
    btnStyle = "border w-[100px] h-[40px] lg:w-[80px] lg:h-[50px]";
  } else if (sm) {
    btnStyle = "border w-[80px] h-[40px]";
  } else if (xs) {
    btnStyle = "border w-[45px] h-[25px] text-xs";
  }

  if (location) {
    return (
      <button
        className={btnStyle}
        type={type}
        onClick={() => {
          if (location) {
            router.push(location);
          }
        }}
      >
        {text}
      </button>
    );
  }

  if (clickMethod) {
    return (
      <button
        className={btnStyle}
        type={type}
        onClick={() => {
          clickMethod();
        }}
      >
        {text}
      </button>
    );
  }

  return (
    <button className={btnStyle} type={type}>
      {text}
    </button>
  );
};

export default Button;
