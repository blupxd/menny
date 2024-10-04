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
import {
  Coffee,
  Delete,
  Edit,
  ExternalLink,
  Eye,
  Trash,
  UtensilsCrossed,
} from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";

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
      <Card key={index} className="h-52 justify-between flex flex-col">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Coffee className="w-5 h-5 mr-2" /> {menu.menuName}
          </CardTitle>
          <CardDescription className="text-xs">id: {menu.id}</CardDescription>
        </CardHeader>
        <CardContent>
          <Link
            href={`/dashboard/menu/${menu.id}`}
            className={`${buttonVariants({
              variant: "outline",
            })}`}
          >
            View <ExternalLink className="w-4 h-4 ml-2" />
          </Link>
        </CardContent>
        <CardFooter className="flex items-end justify-end space-x-2">
          <Button variant="ghost" size="icon">
            <Edit className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Trash className="w-4 h-4" />
          </Button>
        </CardFooter>
      </Card>
    ))
  );
};

export default MenuCards;
