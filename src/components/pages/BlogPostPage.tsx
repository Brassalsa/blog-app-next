import Image from "next/image";
import { CategList } from "../Categories";
import { formatDate } from "@/lib/utils/helpers";
import AuthorUI from "../AuthorUI";
import Comments from "../comments";
import { BlogPostType } from "@/types";
import PostMenu, {
  ActionDelete,
  ActionEdit,
  ShowWhenIsOwner,
  ViewAuthor,
} from "../PostMenu";

function BlogPostPage({
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
      <PostMenu
        author={author}
        id={id}
        className="scale-75 ml-auto"
        menuItems={
          <>
            <ViewAuthor />
            <ShowWhenIsOwner>
              <ActionEdit />
              <ActionDelete />
            </ShowWhenIsOwner>
          </>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        <div className="relative  min-h-52 max-w-full aspect-video mx-auto group overflow-hidden rounded-lg">
          <Image
            src={image}
            alt="post-image"
            sizes="700px"
            fill
            className="object-contain transition group-hover:scale-105"
          />
        </div>
        <div className="space-y-2">
          <h2 className="text text-3xl font-semibold">{title}</h2>
          <div className="flex gap-4 items-center text-sm">
            <CategList list={[category]} asLink />
            <p className="text-muted-foreground">{formatDate(createdAt)}</p>
          </div>
          <AuthorUI author={author} isLink />
          <div className="text-lg ">{about}</div>
        </div>
      </div>
      <div
        className="text-pretty"
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      />
      <Comments postId={id} />
    </div>
  );
}

export default BlogPostPage;
