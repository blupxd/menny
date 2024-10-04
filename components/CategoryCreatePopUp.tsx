"use client";
import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import CategoryForm from "./forms/CategoryForm";

interface CategoryCreatePopUpProps {
  show: boolean;
  onClose: () => void;
  getCategoryParent: (category: string) => void;
}

const CategoryCreatePopUp: React.FC<CategoryCreatePopUpProps> = ({
  show,
  onClose,
  getCategoryParent,
}) => {
  if (!show) return null;

  // Close popup after category creation
  const handleAddCategory = (category: string) => {
    getCategoryParent(category); // Pass the new category to the parent component
    onClose(); // Close the popup after submission
  };

  return (
    <div className="fixed top-0 right-0 flex items-center justify-center left-[300px] z-10 bottom-0 bg-black/80">
      <Button
        onClick={onClose}
        className="absolute top-6 right-6 bg-transparent"
        size="icon"
        variant="secondary"
      >
        <X className="w-6 h-6" />
      </Button>
      <Card className="max-h-max">
        <CardContent className="p-6">
          <CategoryForm handleAddCategory={handleAddCategory} />
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryCreatePopUp;
