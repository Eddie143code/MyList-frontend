"use client";
import React, { useState } from "react";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import { useRef } from "react";
import { useGlobalContext } from "@/state/context/ListContext";
import { useRouter } from "next/navigation";

const page = () => {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<any>(false);

  const router = useRouter();

  const { userLogin, getAllLists } = useGlobalContext();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setError(true);
    console.log(
      `email: ${email.current?.value}, password: ${password.current?.value}`
    );

    const obj = {
      Email: email.current?.value,
      Password: password.current?.value,
    };
    // console.log(obj);
    try {
      await userLogin(obj);
      router.push("/lists");
    } catch (error) {
      console.log(error);
      return setError("Email or Password does not match");
    }
  };
  return (
    <main className="flex justify-center items-center">
      <section className="lg:w-[50%] lg:max-w-[500px] max-w-[220px]">
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 mt-10">
          <Input id="Email" width refValue={email} />
          <Input id="Password" width refValue={password} />

          <div className="mt-3 ">
            <div className="h-[50px] text-[#dc2626]">{error}</div>
            <Button md text="Submit" type="submit" />
          </div>
        </form>
      </section>
    </main>
  );
};

export default page;
