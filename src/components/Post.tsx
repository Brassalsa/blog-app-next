import React from "react";
import { CategList } from "./Categories";
import { formatDate } from "@/lib/utils/helpers";
import Image from "next/image";
import { UserCircle } from "lucide-react";
import AuthorUI from "./AuthorUI";

function Post({
  id,
  title,
  image,
  about,
  category,
  description,
  createdAt,
  updatedAt,
  author,
}: BlogPostType) {
  return (
    <div key={id} className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        <div className="relative  min-h-52 min-w-52 aspect-video mx-auto">
          <Image
            src={image}
            alt="post-image"
            sizes="700px"
            fill
            className="object-contain rounded-lg"
          />
        </div>
        <div className="space-y-2">
          <h2 className="text text-3xl font-semibold">{title}</h2>
          <div className="flex gap-4 items-center text-sm">
            <CategList list={[category]} />
            <p className="text-muted-foreground">{formatDate(createdAt)}</p>
          </div>
          <AuthorUI author={author} />
          <div className="text-lg ">{about}</div>
        </div>
      </div>
      <div
        className="text-pretty"
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      />
    </div>
  );
}

export default Post;
