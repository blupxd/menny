import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Menu {
    id: string;
    menuName: String;
    theme: String;
    menuType: String;
    categories: Category[];
  }
  interface Category {
    id: string;
    items: Item[];
    categoryName: string;
  }
  interface Item {
    id: string;
    itemName: string;
    image: string;
    itemDescription: string;
  }
  interface User extends DefaultUser {
    id: string;
    email: string;
    name: string;
    lastname: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      lastname: string;
    } & DefaultSession["user"];
    token: {
      id: string;
      email: string;
      name: string;
      lastname: string;
    };
  }
}
