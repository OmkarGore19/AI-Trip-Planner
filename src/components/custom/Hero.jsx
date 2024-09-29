import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function Hero() {
  return (
    <div className="flex flex-col items-center gap-8 mx-4 sm:mx-10 md:mx-20 lg:mx-32 xl:mx-56 mt-8">
      {/* Responsive heading */}
      <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[60px] text-center leading-tight">
        Your travel companion, always.
        <br />
        <span className="text-[#ed4069]">
          AI-powered trip planning at your fingertips.
        </span>
      </h1>

      {/* Responsive paragraph */}
      <p className="text-base sm:text-lg md:text-xl text-gray-600 text-center max-w-2xl">
        Let our personal trip planner and travel curator design your perfect
        journey, offering custom itineraries that reflect your passions and fit
        your budget.
      </p>

      {/* Call to action button */}
      <Link to={"/create-trip"}>
        <Button>Get Started, It's free!</Button>
      </Link>

      {/* <div className="mb-18 flex items-center">
      
      <img src="/herocouple.svg" alt="" />
      </div> */}

      {/* Responsive mockup image */}
      <img
        src="/mockup.png"
        alt="Mockup"
        className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 h-auto -mt-25 object-cover mx-2"
      />

      <h2 className="text-center font-ubuntu text-gray-400 mt-5 text-sm tracking-wide">
        Plan Your Perfect Journey with TourificAI© – The Smart, AI-Driven Travel
        Companion
      </h2>
    </div>
  );
}

export default Hero;
