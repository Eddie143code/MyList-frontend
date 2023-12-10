import React from "react";

const Input = ({ id, width, value, onChange, refValue }: any) => {
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
         w-[100%] text-start md:w-[210px] m-0 ${width && "ml-[5px]"}`}
      >
        <label htmlFor={id}>{id}</label>
      </div>
      {value ? (
        <input
          value={value}
          onChange={onChange}
          id={id}
          type="text"
          className="border h-12"
        />
      ) : (
        <input
          ref={refValue}
          onChange={onChange}
          id={id}
          type="text"
          className="border h-12"
        />
      )}
    </div>
  );
};

export default Input;
