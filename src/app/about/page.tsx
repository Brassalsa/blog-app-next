import SocialLinks from "@/components/SocialLinks";
import React from "react";

function About() {
  return (
    <div className="space-y-4">
      <h1>About </h1>
      <h3 className="font-medium">Myself Saurav Chauhan </h3>
      <h4 className="font-medium">Fullstack Web Developer</h4>
      <p>
        Hi, I’m Saurav Chauhan, a fullstack dev and a passionate coder. I love
        creating web applications that are fast, responsive, and user-friendly.
      </p>
      <p>
        I’m exploring Next.js, a React framework that offers server-side
        rendering and routing features, by the way this whole website is build
        with Next.js . I enjoy the challenge of mastering new technologies and
        improving my skills as a developer.
      </p>
      <p>
        When I’m not coding, I like to play action-adventure games, mostly
        single-player ones. Some of my favorites are Uncharted, Spider-Man, and
        GTA. I find these games immersive, thrilling, and fun. They also inspire
        me to be more creative and adventurous in my own projects.
      </p>{" "}
      <p>
        {" "}
        My goal is to become a professional software engineer and create amazing
        websites and apps that can solve real-world problems and make people’s
        lives easier. I also want to share my knowledge and experience with
        other aspiring coders through my blog. I hope you find my blog useful
        and interesting. Feel free to contact me if you have any questions or
        feedback. Thank you for visiting! 😊
      </p>
      <h4 className="w-max mx-auto font-semibold">Follow on Social Media</h4>
      <div className="flex flex-wrap gap-4 w-max mx-auto">
        <SocialLinks />
      </div>
    </div>
  );
}

export default About;
