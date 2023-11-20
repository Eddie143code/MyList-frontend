import Input from "@/components/Input/Input";
import React from "react";
import Button from "@/components/Button/Button";

const page = () => {
  return (
    <main>
      <section className="flex justify-center text-center">
        <form className="flex flex-wrap gap-8 mt-10 lg:w-[50%]">
          <Input id="Name" />
          <Input id="Surname" />
          <Input id="Email" />
          <div className="hidden lg:block"></div>
          <Input id="Password" />
          <Input id="Retype Password" />
          <div className="w-[100%] ml-[50px] lg:ml-[58px]">
            <Button md text="Submit" />
          </div>
        </form>
      </section>
    </main>
  );
};

export default page;
