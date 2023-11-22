import React from "react";

const Input = ({ id, width }: any) => {
  return (
    <div
      className={`flex flex-col justify-center gap-2 w-[100%] 
       ${
         width
           ? "lg:w-[100%] items-center lg:items-start"
           : "lg:w-[45%] items-center"
       }`}
    >
      <div
        className={` 
          lg:w-[70%]
        } w-[70%] text-start md:w-[210px]`}
      >
        <label htmlFor={id}>{id}</label>
      </div>

      <input id={id} type="text" className="border h-12" />
    </div>
  );
};

export default Input;
