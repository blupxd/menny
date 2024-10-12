"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Coffee, Edit, ExternalLink, Trash } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import GradientLink from "./GradientLink";

const MenuCards = () => {
  const [menus, setMenus] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch("/api/menu", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setMenus(data);
    } catch (error: any) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    menus &&
    menus.map((menu: any, index: number) => (
      <Card
        key={index}
        className="h-52 justify-between flex flex-col bg-gradient-to-tr from-purple-800/10 to-cyan-800/10"
      >
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Coffee className="w-5 h-5 mr-2" /> {menu.menuName}
          </CardTitle>
          <CardDescription className="text-xs">id: {menu.id}</CardDescription>
        </CardHeader>
        <CardContent>
          <GradientLink
            href={`/m/${menu.id}`}
            className={`${buttonVariants({
              variant: "outline",
            })}`}
          >
            View <ExternalLink className="w-4 h-4 ml-2" />
          </GradientLink>
        </CardContent>
        <CardFooter className="flex items-end justify-end space-x-2">
          <Link
            href={`/dashboard/menu/${menu.id}`}
            className={`${buttonVariants({ variant: "ghost", size: "icon" })}`}
          >
            <Edit className="w-4 h-4" />
          </Link>
          <Button variant="ghost" size="icon">
            <Trash className="w-4 h-4" />
          </Button>
        </CardFooter>
      </Card>
    ))
  );
};

export default MenuCards;
