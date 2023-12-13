"use client";
import React from "react";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import { useRef } from "react";
import { useGlobalContext } from "@/state/context/ListContext";

const page = () => {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const { userLogin, getAllLists } = useGlobalContext();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(
      `email: ${email.current?.value}, password: ${password.current?.value}`
    );
    const obj = {
      Email: email.current?.value,
      Password: password.current?.value,
    };
    // console.log(obj);
    userLogin(obj);
  };
  return (
    <main className="flex justify-center items-center">
      <section className="lg:w-[50%] lg:max-w-[1000px] max-w-[220px]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap gap-8 mt-10 lg:ml-12"
        >
          <Input id="Email" width refValue={email} />
          <Input id="Password" width refValue={password} />
          <Button md text="Submit" type="submit" />
        </form>
      </section>
    </main>
  );
};

export default page;
