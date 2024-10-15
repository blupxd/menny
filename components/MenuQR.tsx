"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import QRCode from "react-qr-code";
import GradientButton from "./GradientButton";

const MenuQR = () => {
  const [menus, setMenus] = useState<any[]>([]);
  const qrRefs = useRef<any[]>([]);

  const downloadQRCode = (index: number) => {
    const svg = qrRefs.current[index].querySelector("svg");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx!.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngFile;
      downloadLink.download = `qr-code-${index}.png`;
      downloadLink.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

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
    } catch (error: unknown) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    console.log(menus);
  }, []);

  return (
    menus &&
    menus.map((menu: any, index: number) => (
      <Card
        key={index}
        className="justify-between flex flex-col bg-gradient-to-tr from-purple-800/10 to-cyan-800/10"
      >
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            Menu<span className="text-purple-500 ml-2">{menu.menuName}</span>
          </CardTitle>
          <CardDescription>id: {menu.id}</CardDescription>
        </CardHeader>
        <CardContent className="items-center flex-col space-y-4 justify-center flex">
          <div
            ref={(el:any) => (qrRefs.current[index] = el)}
            className="rounded-lg bg-purple-800/40 max-w-max p-2"
          >
            <QRCode
              size={100}
              fgColor="#fff"
              bgColor="transparent"
              value={`https://mennny.vercel.app/m/${menu.id}`}
            />
          </div>
          <GradientButton
            onClick={() => downloadQRCode(index)}
          >
            Download QR Code
          </GradientButton>
        </CardContent>
      </Card>
    ))
  );
};

export default MenuQR;
