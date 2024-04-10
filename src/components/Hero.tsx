import React from "react";
import { TextGenerateEffect } from "./ui/text-generate-effect";

function Hero() {
  return (
    <div className="min-h-56 flex justify-center items-center">
      <h1 className="lg:text-5xl md:text-4xl sm:text-3xl  text-2xl flex flex-col">
        <TextGenerateEffect
          className="font-semibold"
          words="Hey there, its Saurav Chauhan here"
        />
        <TextGenerateEffect
          className="font-medium"
          words="Discover my stories and creative ideas"
        />
      </h1>
    </div>
  );
}

export default Hero;
