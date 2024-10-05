"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CategoryCard from "../../../components/CategoryCard";

interface menuData {
  menuName: string;
  theme: string;
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
  const [menuData, setMenuData] = useState<menuData | null>(null);
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

  const themeColors = () => {
    const colors = {
      candy: { 
        primary: "#de336c", 
        secondary: "#ffee6e", 
        light: "#ff8da3", 
        dark: "#b62b58", 
      },
      aquamarine: {
        primary: "#338270", 
        secondary: "#8ad4c3", 
        light: "#4cd3c1", 
        dark: "#1e4d4b", 
      },
      lighting: {
        primary: "#f79d1e", 
        secondary: "#121212", 
        light: "#f9b77b", 
        dark: "#c47d14", 
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
  
    // Return colors based on the current theme
    return colors[menuData?.theme+""] || colors.candy; // Fallback to candy theme if theme is not found
  };
    
  const colors = themeColors(); // Get the theme colors

  return menuData?.categories ? (
    <div
      className="grid grid-cols-2 p-24 gap-4"
      style={{
        backgroundColor: colors.secondary, // Set the background color inline
      }}
    >
      {menuData.categories.map((category, idx) => (
        <CategoryCard category={category} theme={menuData.theme} key={idx} />
      ))}
    </div>
  ) : (
    <div>The menu is not completed yet</div>
  );
};

export default Page;
