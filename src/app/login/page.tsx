import React from "react";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";

const page = () => {
  return (
    <main className="flex justify-center items-center">
      <section className="lg:w-[50%] lg:max-w-[1000px] max-w-[220px]">
        <form className="flex flex-wrap gap-8 mt-10 lg:ml-12">
          <Input id="Email" width />
          <Input id="Password" width />
          <Button md text="Submit" type="button" />
        </form>
      </section>
    </main>
  );
};

export default page;
