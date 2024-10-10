"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import { getProducts, handleSubscription } from "@/lib/handlers";
import { CircleCheckBig } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const productBenefitsMap: Record<string, string[]> = {
  Premium: ["5 Menus", "Premium themes", "Item images", "Menu QR Code"],
  Standard: ["3 Menus", "Item images", "Menu QR Code"],
  Free: ["1 Menu", "Limited themes", "Menu QR Code"],
};

const Pricing = ({ session }: any) => {
  const [products, setProducts] = useState<any[]>([]);
  const router = useRouter();
  const { id } = session.user;

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
    <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-12">
      {/* Always include the Free plan in the product list */}
      <Card className="p-6 w-full flex flex-col justify-between min-h-[18rem]">
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
          <Button
            onClick={() => !session.data.user || !session && router.push("/register")}
            variant="secondary"
          >
            Choose Free Plan
          </Button>
        </CardFooter>
      </Card>

      {products.length > 0 ? (
        products.map((product) => (
          <Card
            className="p-6 w-full flex flex-col justify-between min-h-[18rem]"
            key={product.id}
          >
            <div>
              <CardTitle className="text-base items-start font-light flex-col space-x-2">
                {product.attributes.name} Plan
                <div className="flex items-end mt-2 font-semibold">
                  <p className="text-3xl ">
                    {product.attributes.price_formatted.split("/")[0]}
                  </p>
                  {product.attributes.price_formatted.split("/")[1] && (
                    <p className="text-base">
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
              <Button
                onClick={() =>
                  handleSubscription(
                    id,
                    product.id,
                    product.attributes.store_id
                  )
                }
                variant="secondary"
              >
                Buy Now
              </Button>
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
