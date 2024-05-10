import AddBlogPage from "@/components/pages/AddBlogPage";
import { getSessionOrRedirect } from "@/lib/utils/authUtils";

async function AddBlog() {
  const session = await getSessionOrRedirect();
  return <AddBlogPage session={session} />;
}

export default AddBlog;
