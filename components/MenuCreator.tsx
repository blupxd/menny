"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Edit, Grip, Loader2, Plus, Save, Trash, Undo2, X } from "lucide-react";
import NewItemForm from "./forms/NewItemForm";
import { useGenerationStore } from "@/lib/themeSelect";
import { useStoreCols } from "@/lib/columnSelect";
import CategoryCreatePopUp from "./CategoryCreatePopUp";
import { useParams } from "next/navigation";
import ItemEditForm from "./forms/ItemEditForm";
import { rectSwappingStrategy, SortableContext } from "@dnd-kit/sortable";
import {
  closestCorners,
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useCategories } from "@/hooks/useCategories";
import SortableItem from "./SortableItem";
import { updateMenu } from "@/lib/handlers";
interface Category {
  categoryName: string;
  items: any[];
}

const MenuCreator = ({ categoriesProps }: any) => {
  const params = useParams();
  const {
    categories,
    setCategories,
    undo,
    canUndo,
    handleDeleteCategory,
    deepCompare,
    handleDeleteItem,
  } = useCategories(categoriesProps);
  const [toggleNewItem, setToggleNewItem] = useState<{
    categoryIndex: number | null;
  }>({
    categoryIndex: null,
  });
  const [deleteCategory, setDeleteCategory] = useState<{
    categoryIndex: number | null;
  }>({
    categoryIndex: null,
  });
  const [deleteItem, setDeleteItem] = useState<{
    categoryIndex: number | null;
    itemIndex: number | null;
  }>({
    categoryIndex: null,
    itemIndex: null,
  });
  const [toggleEditItem, setToggleEditItem] = useState<{
    categoryIndex: number | null;
    itemIndex: number | null;
  }>({
    categoryIndex: null,
    itemIndex: null,
  });

  const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility

  const togglePopup = () => {
    setShowPopup((prev) => !prev); // Toggle popup visibility
  };
  const { theme } = useGenerationStore();
  const { columns } = useStoreCols();
  const [save, setSave] = useState<boolean>(true);
  useEffect(() => {
    if (categoriesProps) {
      setCategories(categoriesProps.reverse());
    }
  }, [categoriesProps]);
  useEffect(() => {
    if (categoriesProps) {
      if (deepCompare(categoriesProps, categories)) {
        setSave(true);
      } else {
        setSave(false);
      }
    }
  }, [categories]);

  useEffect(() => {
    setSave(false);
  }, [theme]);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
    useSensor(TouchSensor)
  );
  const [loading, setLoading] = useState<boolean>(false);
  const saveChanges = async () => {
    setLoading(true);
    setSave(true)
    const changes = await updateMenu(params, categories, theme.name, columns);
    if (changes === true) {
      setLoading(false);
      setSave(true);
    }
  };
  const getPosition = (id: any) => {
    const [categoryIndex, itemIndex] = id.split("-");
    return {
      categoryIndex: parseInt(categoryIndex),
      itemIndex: parseInt(itemIndex),
    };
  };
  const handleAddItem = (newItem: any, categoryIndex: number | null) => {
    if (categoryIndex !== null) {
      setCategories((prevCategories: Category[]) =>
        prevCategories.map((category: Category, idx: number) =>
          idx === categoryIndex
            ? { ...category, items: [...category.items, newItem] }
            : category
        )
      );
      setToggleNewItem({
        categoryIndex: null,
      });
    }
  };
  const handleDragEnd = (e: any) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;

    const {
      categoryIndex: originalCategoryIndex,
      itemIndex: originalItemIndex,
    } = getPosition(active.id);
    const { categoryIndex: newCategoryIndex, itemIndex: newItemIndex } =
      getPosition(over.id);

    setCategories((prevCategories) => {
      const updatedCategories = prevCategories.map((category) => ({
        ...category,
        items: [...category.items],
      }));

      const [movedItem] = updatedCategories[originalCategoryIndex].items.splice(
        originalItemIndex,
        1
      );
      updatedCategories[newCategoryIndex].items.splice(
        newItemIndex,
        0,
        movedItem
      );
      return updatedCategories;
    });
  };

  const handleEditItem = (newItem: any) => {
    if (toggleEditItem) {
      setCategories((prevCategories) =>
        prevCategories.map((category: Category, categoryIndex) => {
          if (categoryIndex === toggleEditItem.categoryIndex) {
            return {
              ...category,
              items: category.items.map((item, itemIndex) => {
                return itemIndex === toggleEditItem.itemIndex ? newItem : item;
              }),
            };
          }
          return category;
        })
      );

      setToggleEditItem({
        categoryIndex: null,
        itemIndex: null,
      });
    }
  };
  useEffect(() => setSave(false), [columns]);
  const handleAddCategory = (categoryName: string) => {
    setCategories([
      ...categories,
      {
        categoryName,
        items: [],
      },
    ]);
  };
  return (
    <div className="grid gap-4 grid-cols-2 p-6">
      <div className="flex justify-end col-span-2 items-center space-x-4">
        <Button disabled={!canUndo} onClick={() => undo()}>
          <Undo2 className="h-4 w-4" />
        </Button>
      </div>
      {categories.length > 0 &&
        categories.map((category: Category, index: number) => (
          <Card
            style={{
              background: theme?.background,
              color: theme?.text,
            }}
            className="col-span-2"
            key={index}
          >
            <CardHeader className="flex-row items-start justify-between">
              <CardTitle className="text-xl font-semibold flex items-center">
                {category.categoryName}{" "}
                <Button variant="ghost" size="icon" className="ml-2 p-0">
                  <Edit className="w-4 h-4" />
                </Button>
              </CardTitle>

              <Grip className="w-4 h-4 mt-0 hover:cursor-grab" />
            </CardHeader>
            <CardContent className={`grid grid-cols-${columns} gap-4`}>
              <DndContext
                sensors={sensors}
                onDragEnd={handleDragEnd}
                collisionDetection={closestCorners}
              >
                <SortableContext
                  strategy={rectSwappingStrategy}
                  items={category.items.map((item, idx) => `${index}-${idx}`)}
                >
                  {category.items.length > 0 &&
                    category.items.map((item: any, idx: number) =>
                      toggleEditItem.categoryIndex === index &&
                      toggleEditItem.itemIndex === idx ? (
                        <div className="flex flex-col" key={idx}>
                          <ItemEditForm
                            key={idx}
                            itemValues={item}
                            handleEditItem={handleEditItem}
                          />
                          <Button
                            style={{
                              borderColor: theme?.primary,
                              background: theme?.background,
                            }}
                            onClick={() =>
                              setToggleEditItem({
                                categoryIndex: null,
                                itemIndex: null,
                              })
                            }
                            variant="outline"
                            className={`${theme && "hover:bg-opacity-90"} mt-2`}
                          >
                            Cancel <X className="h-4 w-4 ml-2" />
                          </Button>
                        </div>
                      ) : (
                        <SortableItem
                          setToggleEditItem={setToggleEditItem}
                          handleDeleteItem={handleDeleteItem}
                          deleteItem={deleteItem}
                          setDeleteItem={setDeleteItem}
                          theme={theme}
                          key={idx}
                          item={item}
                          idx={idx}
                          index={index}
                        />
                      )
                    )}
                </SortableContext>
              </DndContext>
              {toggleNewItem.categoryIndex === index ? (
                <div className="flex flex-col w-full">
                  <NewItemForm
                    category={category.categoryName}
                    handleAddItem={(e: any) => handleAddItem(e, index)}
                  />
                  <Button
                    style={{
                      borderColor: theme?.primary,
                      background: theme?.background,
                    }}
                    onClick={() => setToggleNewItem({ categoryIndex: null })}
                    variant="outline"
                    className={`${theme && "hover:bg-opacity-90"} mt-2`}
                  >
                    Cancel <X className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              ) : (
                <div
                  style={{
                    borderColor: theme?.primary,
                    background: theme?.secondary,
                    color: theme?.text,
                  }}
                  className="w-full p-4 flex max-h-max flex-col items-center rounded-lg bg-black/50 border"
                >
                  <h1 className="text-xs mb-4">Add new item?</h1>
                  <Button
                    onClick={() =>
                      setToggleNewItem({
                        categoryIndex: index,
                      })
                    }
                    variant="ghost"
                    className="px-6 hover:text-orange-500 h-12 py-2 border hover:bg-transparent hover:border-orange-500"
                  >
                    <Plus className="w-4 h-4 " />
                  </Button>
                </div>
              )}
            </CardContent>
            <CardFooter>
              {deleteCategory.categoryIndex === index ? (
                <div className="flex items-center space-x-2 ml-auto">
                  <Button
                    onClick={() => {
                      handleDeleteCategory(deleteCategory.categoryIndex);
                      setDeleteCategory({ categoryIndex: null });
                    }}
                    className="max-w-max bg-red-600 hover:bg-red-700 "
                    variant="destructive"
                  >
                    Confirm
                  </Button>
                  <Button
                    onClick={() => setDeleteCategory({ categoryIndex: null })}
                    variant="outline"
                  >
                    Cancel <X className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setDeleteCategory({ categoryIndex: index })}
                  className="max-w-max ml-auto"
                >
                  Delete <Trash className="w-4 ml-2 h-4" />
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      <Button
        onClick={() => (showPopup ? setShowPopup(false) : setShowPopup(true))}
        variant="outline"
        className="max-w-max mx-auto flex items-center col-span-2"
      >
        Create new category <Plus className="w-4 h-4 ml-2" />
      </Button>
      {showPopup && (
        <CategoryCreatePopUp
          getCategoryParent={handleAddCategory}
          show={showPopup}
          onClose={togglePopup}
        />
      )}

      <div className="flex space-x-4 fixed right-8 bottom-8">
        <Button
          disabled={save}
          onClick={saveChanges}
          variant="outline"
          className="mt-auto items-center"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
          Save <Save className="h-4 w-4 ml-2" />
        </Button>
        <Button variant="destructive" className="bg-red-600" size="icon">
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MenuCreator;
