import Post from "@/components/Post";
import { ALL_CATEGORIES } from "@/lib/constants";
import React from "react";
type Props = {
  params: {
    id: string;
  };
};
function BlogPost({ params }: Props) {
  return (
    <Post
      id={params.id}
      title="Test post"
      catg={[ALL_CATEGORIES.tech]}
      createdAt={new Date()}
      updatedAt={new Date()}
      desc=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla architecto error dolor illum odit, necessitatibus perspiciatis ab debitis fugit nam molestias beatae nesciunt soluta consequatur mollitia, esse non exercitationem magni."
    />
  );
}

export default BlogPost;
