"use client";
import React from "react";
import Button from "../Button/Button";
import { useGlobalContext } from "@/state/context/ListContext";
import { useRouter } from "next/navigation";
const Header = () => {
  const router = useRouter();
  const { userLogout } = useGlobalContext();
  const handleSignOut = async () => {
    const res = await userLogout();
    if (res) {
      router.push("/");
    }
  };

  return (
    <header className="flex flex-col justify-center items-center mt-5 lg:mt-20">
      <div className="flex w-[300px] mb-[50px] lg:w-[600px]">
        <div className="w-[50%]">
          <Button sm text="Home" type="button" location="/" />
        </div>
        <div className="w-[50%] flex justify-end">
          <Button
            sm
            text="Sign Out"
            type="button"
            clickMethod={handleSignOut}
          />
        </div>
      </div>
      <h1 className="text-7xl ">MyList</h1>
    </header>
  );
};

export default Header;
