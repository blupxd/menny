"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import { getProducts, handleSubscription } from "@/lib/handlers";
import { CircleCheckBig, Stars } from "lucide-react";
import { useRouter } from "next/navigation";
import GradientButton from "./GradientButton";

const productBenefitsMap: Record<string, string[]> = {
  Premium: ["5 Menus", "Premium themes", "Item images", "Menu QR Code"],
  Standard: ["3 Menus", "Item images", "Menu QR Code"],
  Free: ["1 Menu", "Limited themes", "Menu QR Code"],
};

const Pricing = ({ session }: any) => {
  const [products, setProducts] = useState<any[]>([]);
  const router = useRouter();
  const { id } = session?.user || "";

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProducts();
      setProducts(response.productData || []);
    };

    fetchProducts();
  }, []);

  // Helper to render the benefits list
  const renderBenefits = (productName: string) => {
    const benefits = productBenefitsMap[productName];
    return benefits ? (
      <ul className="flex flex-col font-light gap-4 max-h-max">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-center">
            <CircleCheckBig className="w-5 h-5 mr-2" /> {benefit}
          </li>
        ))}
      </ul>
    ) : (
      <p>No custom description available</p>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4">
      <h1 className="text-center md:col-span-3 text-5xl my-6 font-semibold bg-gradient-to-b from-gray-300 to-purple-300 bg-clip-text text-transparent">
        Plans and Prices
      </h1>
      <Card className="shadow-sm shadow-gray-800 bg-transparent flex flex-col min-h-[18rem] border-purple-800/20 border p-10 rounded-lg bg-gradient-to-tr from-purple-950/10 to-cyan-600/10">
        <div>
          <CardTitle className="text-base items-start font-light flex-col space-x-2">
            Free Plan
            <div className="flex items-end mt-2 font-semibold">
              <p className="text-3xl ">Free</p>
            </div>
          </CardTitle>
          <div className="w-full py-2 space-x-2 flex items-center">
            <hr className="border-zinc-800 w-full h-0.5" />
            <p className="text-sm font-light text-zinc-500">Features</p>
            <hr className="border-zinc-800 w-full h-0.5" />
          </div>

          <CardContent className="p-0 max-h-max">
            {renderBenefits("Free")}
          </CardContent>
        </div>
        <CardFooter className="pt-4 px-0 pb-0">
          <GradientButton onClick={() => !session && router.push("/register")}>
            Choose Free Plan
          </GradientButton>
        </CardFooter>
      </Card>

      {products.length > 0 ? (
        products.map((product) => (
          <Card
            className={`${
              product.attributes.name === "Premium"
                ? "bg-gradient-to-tr from-purple-600/20 to-cyan-700/20 border-purple-600/50 border-2"
                : "bg-gradient-to-tr from-purple-950/10 to-cyan-600/10 border-purple-800/20 border"
            } shadow-sm shadow-gray-800 bg-transparent flex flex-col min-h-[12rem]  p-10 rounded-lg backdrop-blur-xl`}
            key={product.id}
          >
            {product.attributes.name === "Premium" && (
              <div className="absolute right-0 top-0">
                <p className="px-4 py-2 bg-purple-800 rounded-lg flex items-center">
                  Most popular{" "}
                  <Stars className="w-4 h-4 text-purple-400 ml-2" />
                </p>
              </div>
            )}
            <div>
              <CardTitle className="text-base items-start font-light flex-col space-x-2">
                {product.attributes.name} Plan
                <div className="flex items-end mt-2 font-semibold">
                  <p className="text-3xl ">
                    {product.attributes.price_formatted.split("/")[0]}
                  </p>
                  {product.attributes.price_formatted.split("/")[1] && (
                    <p className="text-base text-purple-600">
                      /{product.attributes.price_formatted.split("/")[1]}
                    </p>
                  )}
                </div>
              </CardTitle>
              <div className="w-full py-2 space-x-2 flex items-center">
                <hr className="border-zinc-800 w-full h-0.5" />
                <p className="text-sm font-light text-zinc-500">Features</p>
                <hr className="border-zinc-800 w-full h-0.5" />
              </div>

              <CardContent className="p-0 max-h-max">
                {renderBenefits(product.attributes.name)}
              </CardContent>
            </div>
            <CardFooter className="pt-4 px-0 pb-0">
              <GradientButton
                onClick={() => {
                  if (!session) router.push("/login");
                  handleSubscription(
                    id,
                    product.id,
                    product.attributes.store_id
                  );
                }}
              >
                Buy Now
              </GradientButton>
            </CardFooter>
          </Card>
        ))
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

export default Pricing;
