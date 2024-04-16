import AddBlogPost from "@/components/AddBlogPost";
import { getSessionOrRedirect } from "@/lib/utils/authUtils";

async function AddBlog() {
  const session = await getSessionOrRedirect();
  return <AddBlogPost session={session} />;
}

export default AddBlog;
