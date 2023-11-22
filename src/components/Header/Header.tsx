import React from "react";
import Button from "../Button/Button";

const Header = () => {
  return (
    <header className="flex flex-col justify-center items-center mt-5 lg:mt-20">
      <div className="w-[300px] mb-[50px] lg:w-[600px]">
        <Button sm text="Home" type="button" location="/" />
      </div>
      <h1 className="text-7xl ">MyList</h1>
    </header>
  );
};

export default Header;
