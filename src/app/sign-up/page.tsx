"use client";
import { useRef, useState } from "react";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import { useGlobalContext } from "@/state/context/ListContext";
import { useRouter } from "next/navigation";

const page = () => {
  const firstName = useRef<HTMLInputElement>(null);
  const surname = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const validatePassword = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<any>({});

  const router = useRouter();

  const { userRegister } = useGlobalContext();
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setErrors({});
    console.log(
      `first name: ${firstName.current?.value}, surname: ${surname.current?.value}, email: ${email.current?.value}, password: ${password.current?.value}, validate password: ${validatePassword.current?.value}`
    );

    const fName = firstName.current?.value;
    const sName = surname.current?.value;
    const em = email.current?.value;
    const pass = password.current?.value;
    const valPass = validatePassword.current?.value;

    let currentErrors: any = {};
    if (!fName) {
      currentErrors.firstName = "Enter your name";
    }
    if (!sName) {
      currentErrors.surname = "Enter your name";
    }
    if (!em) {
      currentErrors.email = "Enter an email";
    }
    if (!pass) {
      currentErrors.password = "Enter a password";
    }
    if (!valPass) {
      currentErrors.validatePassword = "Re-enter your password";
    }
    console.log(currentErrors);

    setErrors(currentErrors);

    const obj = {
      Email: email.current?.value,
      Password: password.current?.value,
    };
    // console.log(obj);

    const validForm = Object.values(currentErrors).every((value) => !value);

    if (validForm) {
      try {
        await userRegister(obj);
        router.push("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <main className="flex justify-center items-center">
      <section className=" lg:w-[50%] lg:max-w-[1000px] max-w-[220px]">
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 mt-10 ">
          <Input id="Name" refValue={firstName} error={errors.firstName} />
          <Input id="Surname" refValue={surname} error={errors.surname} />
          <Input id="Email" refValue={email} width error={errors.email} />
          <Input id="Password" refValue={password} error={errors.password} />
          <Input
            id="Retype Password"
            refValue={validatePassword}
            error={errors.validatePassword}
          />
          <Button md text="Submit" type="submit" />
        </form>
      </section>
    </main>
  );
};

export default page;
