"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CategoryCard from "../../../components/CategoryCard";

// Define possible themes as a union type
type Theme = "candy" | "aquamarine" | "lighting" | "gravestone" | "candycane";

interface MenuData {
  menuName: string;
  theme: Theme; // Use the union type here
  id: string;
  menuType: string;
  categories: Category[];
}

interface Item {
  itemName: string;
  itemDescription: string;
  price: string;
  image: string;
}

interface Category {
  categoryName: string;
  items: Item[];
  columns: number;
}

const Page = () => {
  const [menuData, setMenuData] = useState<MenuData | null>(null);
  const params = useParams();

  const getMenuData = async () => {
    try {
      const response = await fetch(`/api/menu/${params.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        setMenuData(data);
      } else {
        console.error("Error updating menu", data.message);
      }
    } catch (error) {
      console.error("Error during update:", error);
    }
  };

  useEffect(() => {
    getMenuData();
  }, []);

  // Define the theme colors
  const colors: Record<Theme, { primary: string; secondary: string; light: string; dark: string }> = {
    candy: {
      primary: "#f3de4a",
      secondary: "#ebe191",
      light: "#c33764",
      dark: "#b62b58",
    },
    aquamarine: {
      primary: "#338270",
      secondary: "#8ad4c3",
      light: "#4cd3c1",
      dark: "#1e4d4b",
    },
    lighting: {
      primary: "#1f1c17",
      secondary: "#121212",
      light: "#f89c1d",
      dark: "#0a0a0a",
    },
    gravestone: {
      primary: "#2B2D42",
      secondary: "#8D99AE",
      light: "#4B4E66",
      dark: "#1f202f",
    },
    candycane: {
      primary: "#261718",
      secondary: "#d11746",
      light: "#3a1d1d",
      dark: "#1a0d0d",
    },
  };

  const themeColors = () => {
    // Check if the menuData theme exists in the colors object
    return menuData?.theme && colors[menuData.theme] ? colors[menuData.theme] : colors.candy; // Fallback to candy theme
  };

  const colorsSelected = themeColors(); // Get the theme colors

  return menuData?.categories ? (
    <div
      className="flex flex-col p-4 md:p-12 min-h-screen"
      style={{
        backgroundColor: colorsSelected.dark, // Set the background color inline
      }}
    >
      <h1 style={{borderColor: colorsSelected.light}} className="text-5xl border-b-2 text-center mx-auto pt-6 max-w-max pb-2 mb-12 italic">{menuData.menuName}</h1>
      {menuData.categories.map((category, idx) => (
        <CategoryCard category={category} theme={colorsSelected} key={idx} />
      ))}
      <div className="bg-black/5 rounded-lg md:mt-12 mt-auto justify-end p-6">
        <p className="text-white/30 text-xs text-center m-auto">Powered by Menny</p>
      </div>
    </div>
  ) : (
    <div>The menu is not completed yet</div>
  );
};

export default Page;
