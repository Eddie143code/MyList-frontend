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
        <div className="w-[100%] flex justify-center gap-5">
          <Button sm text="Home" type="button" location="/" />
          <Button sm text="Lists" type="button" location="/lists" />
          <Button
            sm
            text="Sign Out"
            type="button"
            clickMethod={handleSignOut}
          />
        </div>
      </div>
      <div>
        <h1 className="text-7xl ">MyList</h1>
      </div>
    </header>
  );
};

export default Header;
