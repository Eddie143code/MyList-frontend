"use client";
import { useRef } from "react";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import { useGlobalContext } from "@/state/context/ListContext";

const page = () => {
  const firstName = useRef<HTMLInputElement>(null);
  const surname = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const validatePassword = useRef<HTMLInputElement>(null);

  const { userRegister } = useGlobalContext();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(
      `first name: ${firstName.current?.value}, surname: ${surname.current?.value}, email: ${email.current?.value}, password: ${password.current?.value}, validate password: ${validatePassword.current?.value}`
    );
    const obj = {
      Email: email.current?.value,
      Password: password.current?.value,
    };
    // console.log(obj);
    userRegister(obj);
  };
  return (
    <main className="flex justify-center items-center">
      <section className=" lg:w-[50%] lg:max-w-[1000px] max-w-[220px]">
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-8 mt-10 ">
          <Input id="Name" refValue={firstName} />
          <Input id="Surname" refValue={surname} />
          <Input id="Email" refValue={email} width />
          <Input id="Password" refValue={password} />
          <Input id="Retype Password" refValue={validatePassword} />
          <Button md text="Submit" type="submit" />
        </form>
      </section>
    </main>
  );
};

export default page;
