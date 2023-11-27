import Image from "next/image";
import Header from "@/components/Header/Header";
import styles from "./page.module.css";
import Button from "@/components/Button/Button";

export default function Home() {
  return (
    <main className=" flex flex-col">
      <section className="flex flex-col justify-center text-center mt-28 gap-14">
        <Button lg text={"Sign up"} location="/sign-up" />
        <Button lg text={"Login"} location="/login" />
        <Button lg text={"Guest"} location="/lists" />
      </section>
    </main>
  );
}
