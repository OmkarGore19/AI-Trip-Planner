import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="flex flex-col items-center mx-56 gap-8">
      <h1 className="font-extrabold text-[60px] text-center mt-8">
      Your travel companion, always. 
        <br />
        <span className="text-[#ed4069]">AI-powered trip planning at your fingertips.</span>
      </h1>

      <p className="text-xl text-gray-600 text-center">Let our personal trip planner and travel curator design your perfect journey, offering custom itineraries that reflect your passions and fit your budget.</p>
      <Link to={'/create-trip'}>
      <Button>Get Started, It's free!</Button>
      </Link>
    </div>
  );
}

export default Hero;
