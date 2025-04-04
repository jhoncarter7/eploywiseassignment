import React from "react";
import Button from "../components/Button";
import axios from "axios";
import { useRef } from "react";

const Signup = () => {
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post("https://reqres.in/api/login", {
          email: emailRef.current.value,
          password: passRef.current.value,
        });
        console.log("Registration successful:", res.data);
        
        // Handle successful signup (e.g., redirect, display a message, etc.)
      } catch (error) {
        console.error("Error during registration:", error);
        // Handle error state (e.g., show an error message to the user)
      }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-[80vh] ">
      <div className="shadow-md p-12">
        <h1 className="font-sans font-semibold text-lg pb-8">
          Create an account
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5  justify-center items-center my-auto "
        >
          <input
            type="email"
            placeholder="your email"
            ref={emailRef}
            className="border-[1px] rounded-md p-2 focus:outline-none"
          />
          <input
            type="password"
            placeholder="password"
            ref={passRef}
            className="border-[1px] rounded-md p-2 focus:outline-none"
          />
          <Button type="submit" text="Signup" />
        </form>
      </div>
    </div>
  );
};

export default Signup;
