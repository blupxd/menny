"use client";
import React from "react";
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
    <div className="fixed top-0 h-full right-0 flex items-center justify-center left-0 md:left-[300px] z-30 bottom-0 bg-black/80">
      <Card className="max-h-max">
        <CardContent className="p-6 relative">
          <CategoryForm handleAddCategory={handleAddCategory} />
          <Button
            onClick={onClose}
            className="absolute top-2 right-2 bg-transparent"
            size="icon"
            variant="secondary"
          >
            <X className="w-4 h-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryCreatePopUp;
