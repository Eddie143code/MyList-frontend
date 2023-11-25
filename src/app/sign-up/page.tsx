import Input from "@/components/Input/Input";
import React from "react";
import Button from "@/components/Button/Button";

const page = () => {
  return (
    <main className="flex justify-center items-center">
      <section className=" lg:w-[50%] lg:max-w-[1000px] max-w-[220px]">
        <form className="flex flex-wrap gap-8 mt-10 ">
          <Input id="Name" />
          <Input id="Surname" />
          <Input id="Email" width />
          <Input id="Password" />
          <Input id="Retype Password" />
          <Button md text="Submit" type="button" />
        </form>
      </section>
    </main>
  );
};

export default page;
