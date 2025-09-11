'use client';
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import ButtonAnim from "@/components/button-anim";
import TextField from "@/components/text-field";
import TextArea from "@/components/text-area";
import Button from "@/components/button";

const internSans = Inter({
  variable: "--font-intern-sans",
  subsets: ["latin"],
});

export default function ContactForm(props: React.HTMLAttributes<HTMLFormElement>) {
  return (
    <form className="flex flex-col w-full gap-1" {...props}>
      <div className="flex w-full gap-2">
        <TextField 
          id={"name"}
          placeholder="Name"
          type="text"
        />

        <TextField 
          id="email"
          placeholder="Email"
          type="email"
        />

      </div>
      <div>
        <TextArea
          rows={14}
          placeholder="Additional Details"
        />
      </div>

      <div className="flex justify-center">
        <Button>SUBMIT</Button>
      </div>
    </form>
  );
}
