export const links = {
  home: "/",
  blogs: "/blogs",
  blog: (id: string) => "/blog/" + id,
  addBlog: "/blog/add",
  editBlog: (id: string) => "/blog/edit/" + id,
  about: "/about",
  account: "/account",
  accountId: (id: string) => "/account/" + id,
  signIn: "/sign-in",
  blogCat: (cat: string) => "/blogs/category/" + cat,
};
