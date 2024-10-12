"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { Coins, Edit } from "lucide-react";
import { Button } from "../ui/button";
import { useGenerationStore } from "@/lib/themeSelect";
import { FileUploader } from "../FileUploader";

// Define the schema for the form
const formSchema = z.object({
  itemName: z.string().min(3, { message: "This field has to be filled." }),
  image: z.any(),
  itemDescription: z.string().max(300, { message: "Your description is too long." }),
  price: z.string().min(1, { message: "You have to enter a value" }),
});

// Define the props for the ItemEditForm component
interface ItemEditFormProps {
  handleEditItem: (item: {
    itemName: string;
    itemDescription: string;
    price: string;
    image: File | null;
    id: string;
  }) => void;
  itemValues: {
    itemName: string;
    itemDescription: string;
    price: string;
    image: File | string;
    id: string;
  };
}

const ItemEditForm: React.FC<ItemEditFormProps> = ({ handleEditItem, itemValues }) => {
  const { theme } = useGenerationStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemName: itemValues.itemName,
      itemDescription: itemValues.itemDescription,
      price: itemValues.price,
      image: itemValues.image,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newItem = {
      itemName: values.itemName,
      itemDescription: values.itemDescription,
      price: values.price,
      image: values.image,
      id: itemValues.id || "",
    };
    handleEditItem(newItem);
  };

  return (
    <Form {...form}>
      <form
        style={{
          borderColor: theme?.primary,
          background: theme?.secondary,
        }}
        className="w-full flex md:flex-row flex-col items-start lg:space-x-4 p-4 text-white rounded-lg border bg-black/50"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FileUploader
          image={itemValues.image}
          onChange={(files) => {
            const image = files.length > 0 ? files[0] : null;
            form.setValue("image", image);
          }}
        />
        <div className="flex flex-col h-full lg:mt-0 mt-4 justify-between space-y-4 w-full">
          <div className="flex lg:flex-row flex-col lg:space-x-4 lg:space-y-0 space-y-4">
            <CustomFormField
              fieldType={FormFieldType.ITEMNAME}
              control={form.control}
              name="itemName"
              placeholder="Item name"
            />
            <CustomFormField
              fieldType={FormFieldType.ITEMNAME}
              control={form.control}
              name="price"
              placeholder="Price"
              icon={Coins}
            />
          </div>
          <div className="flex lg:flex-row flex-col space-y-4 lg:space-y-0 lg:space-x-4">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="itemDescription"
              placeholder="Item description"
            />
            <Button
              style={{
                background: theme?.background,
                borderColor: theme?.primary,
                color: theme?.text,
              }}
              className={`h-full ${
                theme && "hover:opacity-80 transition-all duration-200 ease-in-out"
              }`}
              variant="outline"
              type="submit"
            >
              Edit <Edit className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ItemEditForm;
