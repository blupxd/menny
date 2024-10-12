"use client";

import { ImagePlus } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { Button } from "./ui/button";

type FileUploaderProps = {
  onChange: (files: File[]) => void;
  image: File | string;
};

export const FileUploader = ({ onChange, image }: FileUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Create a ref for the file input
  const [file, setFile] = useState<string>("");
  const convertFileToUrl = (file: File) => URL.createObjectURL(file);
  // Determine if item.image is a File or a string (URL)
  const imageUrl = image instanceof File ? convertFileToUrl(image) : image;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploadedFiles = Array.from(e.target.files);
      onChange(uploadedFiles); // Call the onChange to handle file updates
      setFile(convertFileToUrl(uploadedFiles[0]));
      console.log(uploadedFiles);
    }
  };

  return (
    <div className="w-20 h-20 flex items-center justify-center relative">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef} // Assign the ref to the input
        onChange={handleFileChange}
        className="hidden" // Hide the file input
      />
      {(file && file.length > 0) || image ? ( // Check if there are files
        <div
          className="h-20 w-20 relative rounded-md hover:opacity-90 hover:cursor-pointer overflow-hidden"
          onClick={() => fileInputRef.current?.click()}
        >
          <Image
            src={file || imageUrl} // Display the first uploaded image
            fill
            alt="uploaded image"
            className="object-cover"
          />
        </div>
      ) : (
        <Button
          type="button"
          onClick={() => fileInputRef.current?.click()} // Trigger click on the input
          variant="outline"
          className="w-20 h-20 flex items-center justify-center"
        >
          <ImagePlus className="w-10 h-10" />
        </Button>
      )}
    </div>
  );
};
