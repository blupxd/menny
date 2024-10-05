import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
const CategoryCard = ({ category, theme }: any) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{category.categoryName}</CardTitle>
      </CardHeader>
      <CardContent className={`grid grid-cols-${category.columns} gap-2`}>
        {category.items.map((item, key) => (
          <Card key={key}>
            <CardContent className="flex items-start space-x-2">
              {item.image && (
                <Image
                  alt={item.name}
                  width={100}
                  height={100}
                  className="w-20 h-20 rounded-md"
                  src={item.image}
                />
              )}
              <div className="flex flex-col w-full">
                <div className="flex items-center space-x-12">
                  <h1 className="text-xl">{item.itemName}</h1>
                  <p className="font-bold">{item.price}</p>
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
