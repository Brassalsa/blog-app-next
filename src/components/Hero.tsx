import React from "react";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import Image from "next/image";

function Hero() {
  return (
    <div className="flex gap-8 justify-center items-center min-h-96">
      <div className="relative flex-shrink-0 size-0 sm:size-36 md:size-52 lg:size-64 rounded-full overflow-hidden aspect-square">
        <Image
          src="https://avatars.githubusercontent.com/u/65347944?v=4"
          alt="user image"
          fill
          sizes="300px"
        />
      </div>
      <div className=" flex justify-center items-center">
        <h1 className="lg:text-5xl md:text-4xl sm:text-3xl  text-2xl flex flex-col">
          <TextGenerateEffect
            className="font-semibold"
            children={`Hey there, its Saurav Chauhan here`}
            preset="blur"
          />
          <TextGenerateEffect
            className="font-medium"
            children="Discover my stories and creative ideas"
            preset="blur"
          />
        </h1>
      </div>
    </div>
  );
}

export default Hero;
