import React from "react";
import Mockup from "../assets/laptopMock.png";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-4 min-h-[calc(100vh-80px)] ">
      <div className="flex flex-col gap-6 items-center text-center  mt-10">
        <h1 className="text-4xl md:text-6xl font-normal md:leading-16">
          Send A Message To A <br /> Collegue or Friend
        </h1>
        <p className="text-sm md:text-[1rem] md:font-normal">
          Straightforward, dependable, secure communication and <br /> free
          calls, accessible world wide
        </p>
        <div className="mt-2 grid md:grid-cols-2 items-center gap-4">
          <Link to={"/sign-in"} className="btn btn-dash btn-primary">Continue</Link>
          <Link to={"/sign-up"} className="btn btn-primary">Create An Account</Link>
        </div>
        <img src={Mockup} alt="" />
      </div>
    </div>
  );
};

export default HomePage;
