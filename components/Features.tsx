import { Image, PaintBucket, QrCode } from "lucide-react";
import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";

const Features = () => {
  const features = [
    {
      icon: Image,
      title: "Product Images",
      description:
        "Showcase your menu items with images. Upgrade to premium to upload and display product images for a richer customer experience.",
    },
    {
      icon: QrCode,
      title: "QR Code Generation",
      description:
        "Simplify access to your menu with a scannable QR code, allowing customers to view it instantly on their devices.",
    },
    {
      icon: PaintBucket,
      title: "Menu Themes",
      description:
        "Personalize your menu with various themes. Upgrade to premium to unlock exclusive, customizable premium themes.",
    },
  ];

  return (
    <div className="flex flex-col py-24">
      <div className="flex lg:flex-row flex-col mb-4 items-start lg:space-x-6">
        <h1 className="text-5xl font-semibold bg-gradient-to-b from-gray-300 to-purple-300 bg-clip-text text-transparent">
          Powerful features to help you build your menu fast
        </h1>
        <p className="text-lg md:mt-0 mt-4 md:text-sm ml-0 md:w-2/3 text-gray-500">
          Our features make menu creation easy and efficient. From adding images
          to generating QR codes and customizing themes, everything is built to
          simplify your workflow.
        </p>
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        {features.map((feature, idx) => (
          <Card
            key={idx}
            className="shadow-sm shadow-gray-800 bg-transparent grid-cols-2 border-purple-800/20 border p-4 rounded-lg bg-gradient-to-tr from-purple-950/10 to-cyan-600/10"
          >
            <CardHeader className="flex flex-col">
              <feature.icon className="w-10 text-purple-600 h-10 mb-4" />
              <h1 className="font-semibold text-lg">{feature.title}</h1>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-gray-400">{feature.description}</p>
            </CardContent>
          </Card>

        ))}
      </div>
    </div>
  );
};

export default Features;
