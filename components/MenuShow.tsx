"use client";
import CreatorNav from "@/components/CreatorNav";
import MenuCreator from "@/components/MenuCreator";
import { themes } from "@/constants";
import { useStoreCols } from "@/lib/columnSelect";
import { useGenerationStore } from "@/lib/themeSelect";
import { useSetType } from "@/lib/typeSelect";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
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
interface menuData {
  menuName: string;
  theme: string;
  id: string;
  menuType: string;
  categories: Category[];
}
const MenuShow = ({isPro}: any) => {
  const [menuData, setMenuData] = useState<menuData | null>(null);
  const params = useParams();
  const { setCols } = useStoreCols();
  const { setTheme } = useGenerationStore();
  const { setType } = useSetType();
  const getMenuData = async () => {
    try {
      const response = await fetch(`/api/menu/${params.menuId}?editMode=true`, {
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
  useEffect(() => {
    if (menuData?.categories[0]) setCols(menuData?.categories[0]?.columns);
    if (menuData?.theme !== "") {
      const selectedTheme = themes.find(
        (theme) => theme.name === menuData?.theme
      );
      if (selectedTheme) {
        setTheme(selectedTheme);
      }
    }
    if (menuData?.menuType) setType(menuData.menuType);
  }, [menuData]);

  return (
    <div className="flex flex-col min-h-screen">
      <CreatorNav name={menuData?.menuName} id={menuData?.id} />
      <MenuCreator isPro={isPro} categoriesProps={menuData?.categories} />
    </div>
  );
};

export default MenuShow;
