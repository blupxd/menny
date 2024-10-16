import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
interface Category {
  categoryName: string;
  items: any[];
  columns: number;
}
interface Theme {
  primary: string;
  dark: string;
  light: string;
  secondary: string;
}
interface Item {
  itemName: string;
  description: string;
  price: string;
  image: string;
}
interface Props {
  category: Category;
  theme: Theme;
}
const CategoryCard = ({ category, theme }: Props) => {
  return (
    <Card
      style={{
        background: theme.primary,
        borderColor: theme.dark,
      }}
      className="my-4"
    >
      <CardHeader>
        <CardTitle className="text-3xl md:text-4xl font-dark italic text-center p-2 sm:p-6">
          {category.categoryName}
        </CardTitle>
      </CardHeader>
      <CardContent className={`grid grid-cols-${category.columns} p-2 md:p-6 gap-2 md:gap-6`}>
        {category.items.map((item: Item, key: number) => (
          <Card style={{
            borderColor: theme.light,
            background: theme.secondary
          }} key={key}>
            <CardContent className="flex p-2 md:p-4 items-start">
              {item.image && (
                <Image
                  alt={item.itemName}
                  width={100}
                  height={100}
                  style={{
                    background: theme.primary,
                    borderColor: theme.dark
                  }}
                  className="md:w-24 p-0 sm:p-2 md:h-24 w-16 h-16 rounded-lg md:rounded-xl border-2"
                  src={item.image}
                />
              )}
              <div className="flex flex-col w-full">
                <div className="flex flex-col md:flex-row md:items-center px-2 md:p-0 justify-around">
                  <h1 style={{
                    color: theme.light
                  }} className="text-xs sm:text-base md:text-xl font-semibold">{item.itemName}</h1>
                  <p style={{
                    color:theme.light,
                    borderColor: theme.primary
                  }} className="mt-1 text-sm sm:text-base md:text-xl italic border-b-2 max-w-max">
                    {item.price}
                  </p>
                </div>
                {item.description && <p>{item.description}</p>}
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
