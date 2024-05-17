export const links = {
  home: "/",
  blogs: "/blogs",
  blog: (id: string) => "/blog/" + id,
  addBlog: "/blog/add",
  about: "/about",
  account: "/account",
  signIn: "/sign-in",
  blogCat: (cat: string) => "/blogs/category/" + cat,
};
