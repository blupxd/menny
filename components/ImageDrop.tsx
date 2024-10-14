"use client";

import { UploadCloud } from "lucide-react";
import React, { useRef, useState } from "react";
import GradientButton from "./GradientButton";

type FileUploaderProps = {
  onChange: (files: File[]) => void;
  image: File | string;
};

export const ImageDrop = ({ onChange }: FileUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploadedFiles = Array.from(e.target.files);
      onChange(uploadedFiles);
    }
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      onChange([droppedFile]);
    }
  };

  return (
    <div
      className="border py-6 px-12 md:max-w-max w-full font-thin items-center rounded-lg flex flex-col relative"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <div className="rounded-full mb-2 max-w-max flex items-center justify-center p-2 bg-gray-800">
        <UploadCloud className="md:w-6 md:h-6 h-8 w-8 text-white" />
      </div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <GradientButton className="md:hidden">Upload your image</GradientButton>
      <p className="text-xs md:block hidden">
        <span className="font-normal underline hover:cursor-pointer">
          Click to upload
        </span>{" "}
        or drag and drop an image
      </p>
      <p className="text-xs mt-2">SVG, PNG or JPG (max. 500x500, limit 3.5MB)</p>

      {/* Overlay message when dragging */}
      {isDragging && (
        <div className="absolute inset-0 pointer-events-none z-10 bg-black/80 flex items-center justify-center rounded-lg">
          <p className="text-white text-lg">Drop here your image</p>
        </div>
      )}
    </div>
  );
};
