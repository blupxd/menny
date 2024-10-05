import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Edit, Grip, ImagePlus, Trash, X } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

const SortableItem = ({
  item,
  idx,
  index,
  theme,
  handleDeleteItem,
  deleteItem,
  setActionState,
}: any) => {
  const { attributes, listeners, setNodeRef, transform, active, transition } =
    useSortable({ id: `${index}-${idx}` });

  // Function to convert a File to a URL
  const convertFileToUrl = (file: File) => URL.createObjectURL(file);
  const handleToggleEditItem = (categoryIndex: any, itemIndex: any) => {
    setActionState((prev: any) => ({
      ...prev,
      toggleEditItem: { categoryIndex, itemIndex },
    }));
  };

  const handleSetDeleteItem = (categoryIndex: any, itemIndex: any) => {
    setActionState((prev: any) => ({
      ...prev,
      deleteItem: { categoryIndex, itemIndex },
    }));
  };

  // Determine if item.image is a File or a string (URL)
  const imageUrl =
    item.image instanceof File ? convertFileToUrl(item.image) : item.image;

  return (
    <div
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        borderColor: theme?.primary,
        background: theme?.secondary,
        color: theme?.text,
      }}
      className="w-full max-h-max flex items-start space-x-4 p-4 rounded-lg border bg-black/50"
    >
      {item.image ? (
        <div className="w-20 h-20 rounded-lg relative overflow-hidden">
          <Image
            src={imageUrl} // Use the appropriate image URL (either converted or directly from string)
            alt={item.itemName}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <Button
          style={{
            background: theme?.background,
            borderColor: theme?.primary,
            color: theme?.primary,
          }}
          variant="outline"
          className={`${
            theme && "hover:opacity-60"
          } w-20 h-20 transition-all duration-100 ease-in-out flex items-center justify-center`}
        >
          <ImagePlus className="w-10 h-10" />
        </Button>
      )}
      <div className="flex flex-col justify-between -mt-1 flex-grow h-20">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">{item.itemName}</h2>
          <p
            className="text-base font-bold"
            style={{
              color: theme?.primary,
            }}
          >
            {item.price}
          </p>
        </div>
        {item.itemDescription && (
          <p className="text-xs w-48 text-wrap text-ellipsis overflow-hidden flex-grow">
            {item.itemDescription}
          </p>
        )}
        <div className="flex items-start space-x-4">
          <Button
            style={{
              color: theme?.secondary,
              background: theme?.primary,
            }}
            onClick={() => handleToggleEditItem(index, idx)}
            variant="secondary"
            size="icon"
            className={theme && "hover:opacity-60"}
          >
            <Edit className="w-4 h-4" />
          </Button>
          {deleteItem.categoryIndex === index &&
          deleteItem.itemIndex === idx ? (
            <div className="flex items-center space-x-2 text-xs">
              <Button
                onClick={() => {
                  handleDeleteItem(index, idx);
                  handleSetDeleteItem(null, null);
                }}
                variant="ghost"
                className="bg-red-600 hover:bg-red-700 text-xs text-white"
              >
                Confirm <Trash className="h-4 w-4 ml-2" />
              </Button>
              <Button
                onClick={() => handleSetDeleteItem(null, null)}
                variant="outline"
                className=" text-xs"
              >
                Cancel <X className="h-4 w-4 ml-2" />
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => handleSetDeleteItem(index, idx)}
              variant="destructive"
              className="bg-red-600"
              size="icon"
            >
              <Trash className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
      <Button
        style={{
          cursor: active ? "grabbing" : "grab",
        }}
        size="icon"
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        variant="ghost"
        className="hover:bg-transparent h-4 w-4"
      >
        <Grip className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default SortableItem;
