import {
  Beer,
  Coffee,
  FilePlus,
  Home,
  Pizza,
  QrCode,
  ShoppingBag,
  Soup,
  User,
  Utensils,
  Vegan,
} from "lucide-react";
export const themes = [
  {
    name: "default",
    primary: "",
    secondary: "",
    background: "",
    text: ""
  },
  {
    name: "candy",
    primary: "#de336c",
    secondary: "#ffee6e",
    background: "#e2ff91", // Light background
    text: "#d40d7a", // Dark text for better visibility
  },
  {
    name: "aquamarine",
    primary: "#338270",
    secondary: "#8ad4c3",
    background: "#cbf5eb", // Light background
    text: "#1A535C", // Dark text
  },
  {
    name: "lighting",
    primary: "#f79d1e",
    secondary: "#121212",
    background: "#1f1c17", // Light background
    text: "#f2d3a0", // Dark text
  },
  {
    name: "gravestone",
    primary: "#2B2D42", // Dark primary for depth
    secondary: "#8D99AE", // Lighter secondary for contrast
    background: "#E0E0E0", // Light grey background
    text: "#2B2D42", // Dark text
  },
  {
    name: "candycane",
    primary: "#261718",
    secondary: "#d11746",
    background: "#0d0c0c", // Light background
    text: "#fae1e1", // Dark red text for contrast
  },
];

export const menuTypes = [
  {
    type: "Cafe",
    icon: Coffee,
  },
  {
    type: "Pub",
    icon: Beer,
  },
  {
    type: "Fast Food",
    icon: Pizza,
  },
  {
    type: "Restauraunt",
    icon: Utensils,
  },
  {
    type: "Vegan Restauraunt",
    icon: Vegan,
  },
  {
    type: "Sushi Restauraunt",
    icon: Soup,
  },
];
export const menuItems = [
  {
    label: "Home",
    link: "/",
    icon: Home,
  },
  {
    label: "View Profile",
    link: "/dashboard/profile",
    icon: User,
  },
  {
    label: "Plans & Pricing",
    link: "/pricing",
    icon: ShoppingBag,
  }
];
export const accordionMenu = [
  {
    label: "Create a menu",
    link: "/dashboard",
    icon: FilePlus,
  },
  {
    label: "Menu QR codes",
    link: "/dashboard/menu-qr",
    icon: QrCode,
  },
];
