import { Bezier } from "iconsax-reactjs";
import React from "react";
import AppButton from "./../shareComponents/AppButton";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className=' img  bg-[url("./images/socialapp.png")] bg-contain bg-no-repeat  h-full '>
      <div className="w-full h-full flex-col items-center gap-1.5 justify-end pr-4">
        <Bezier size="80" color="#F3F4F6" />
        <div className="flex flex-row mb-4 justify-end">
          <h1 className="text-4xl font-bold text-fuchsia-900">
            Welcome to Social App
          </h1>
        </div>
        <div className="flex flex-col gap-4 items-end justify-center">
          <AppButton
            as={Link}
            to="/login"
            className="bg-fuchsia-900 w-96 text-white hover:bg-fuchsia-800"
          >
            Login
          </AppButton>
          <AppButton
            as={Link}
            to="/register"
            className="bg-fuchsia-900 w-96 text-white hover:bg-fuchsia-800"
          >
            Register
          </AppButton>
        </div>
      </div>
    </main>
  );
}
