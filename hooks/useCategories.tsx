import { useState, useEffect } from "react";

interface Category {
  categoryName: string;
  items: any[];
}

export const useCategories = (categoriesProps: any) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [catHist, setCatHist] = useState<any[]>([]);
  const [pointer, setPointer] = useState<number>(0);
  const [isUndoing, setIsUndoing] = useState<boolean>(false); // Track if undo is being performed

  useEffect(() => {
    if (categoriesProps) {
      setCategories(categoriesProps.reverse());
      setCatHist([categoriesProps.reverse()]); // Initialize history with initial state
    }
  }, [categoriesProps]);

  useEffect(() => {
    if (!isUndoing) {
      setCatHist([...catHist, categories]); // Save current state to history
      setPointer(catHist.length); // Update pointer to the latest state
    }
  }, [categories]);

  const undo = () => {
    if (catHist.length > 0 && pointer > 0) {
      setIsUndoing(true); // Set undo flag

      // Go back to previous state
      const previousState = catHist[pointer - 1];
      setCategories(previousState);

      // Remove the last action from history
      setCatHist((prevHist) => prevHist.slice(0, -1));

      // Decrement the pointer
      setPointer((prevPointer) => prevPointer - 1); // Move the pointer back

      // Reset the undo flag after the state change
      setTimeout(() => {
        setIsUndoing(false); // Unset undo flag after undo is done
      }, 1);
    }
  };

  const deepCompare = (arr1: any[], arr2: any[]): boolean => {
    if (arr1.length !== arr2.length) return false;
    return arr1.every(
      (item, index) => JSON.stringify(item) === JSON.stringify(arr2[index])
    );
  };

  const handleDeleteCategory = (categoryIndex: number | null) =>{
    if(categoryIndex !== null){
      const clearedCategories = categories.filter((category:any, index) => index !== categoryIndex)
      console.log(clearedCategories)
      setCategories(clearedCategories)
    }
  }
  

  const handleDeleteItem = (
    categoryIndex: number | null,
    itemIndex: number | null
  ) => {
    console.log(categoryIndex, itemIndex)
    if (categoryIndex !== null && itemIndex !== null) {
      setCategories((prevCategories) =>
        prevCategories.map((category, idx) => {
          if (idx === categoryIndex) {
            const updatedItems = category.items.filter(
              (_, i) => i !== itemIndex
            );
            return { ...category, items: updatedItems };
          }
          return category;
        })
      );
    }
  };
  const canUndo = pointer - 1 > 0
  return {
    categories,
    setCategories,
    handleDeleteCategory,
    undo,
    deepCompare,
    handleDeleteItem,
    canUndo
  };
};
