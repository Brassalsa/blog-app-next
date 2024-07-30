export const links = {
  home: "/",

  blogs: "/blogs",
  blog: (id: string) => "/blog/" + id,
  addBlog: "/blog/add",
  editBlog: (id: string) => "/blog/edit/" + id,
  blogCat: (cat: string) => links.blogs + "/category/" + cat,

  about: "/about",

  account: "/account",
  accountSettings: "/account/settings",
  accountId: (id: string) => links.account + "/" + id,

  signIn: "/sign-in",
};
