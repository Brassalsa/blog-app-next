import { ALL_CATEGORIES } from "@/lib/constants";
import React from "react";
import { CategList } from "./Categories";

type Props = {
  id: string;
  title: string;
  catg: ALL_CATEGORIES[];
  desc: string;
  createdAt: Date;
  updatedAt: Date;
};

function Post({ id, title, catg, desc, createdAt, updatedAt }: Props) {
  return (
    <div>
      <h2 className="text">{title}</h2>
      <span>{createdAt.toDateString()}</span>
      <CategList list={catg} />
      <div>{desc}</div>
    </div>
  );
}

export default Post;
