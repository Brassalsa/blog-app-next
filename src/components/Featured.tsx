import React from "react";
import PostCard from "./PostCard";
import { ALL_CATEGORIES } from "@/lib/constants";

function Featured() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-5">Featured</h2>
      <PostCard
        id="123"
        title="Test post"
        catg={[ALL_CATEGORIES.tech, ALL_CATEGORIES.food]}
        date={new Date()}
        desc=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla architecto error dolor illum odit, necessitatibus perspiciatis ab debitis fugit nam molestias beatae nesciunt soluta consequatur mollitia, esse non exercitationem magni."
      />
    </div>
  );
}

export default Featured;
