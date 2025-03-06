import React from "react";
import Mockup from "../assets/laptopMock.png";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="max-w-[1600px] mx-auto px-6 py-4 min-h-[calc(100vh-80px)] ">
      <div className="flex flex-col gap-6 items-center text-center  mt-10">
        <h1 className="text-4xl md:text-6xl font-normal md:leading-16">
          Send A Message To A <br /> Collegue or Friend
        </h1>
        <p className="text-sm md:text-[1rem] md:font-normal">
          Straightforward, dependable, secure communication and <br /> free
          calls, accessible world wide
        </p>
        <Link to={"/sign-in"} className="btn btn-primary">
          Get Started
        </Link>
        <img src={Mockup} alt="" />
      </div>
    </div>
  );
};

export default HomePage;
