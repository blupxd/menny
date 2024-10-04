"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { Coins, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useGenerationStore } from "@/lib/themeSelect";
import { FileUploader } from "../FileUploader";

const formSchema = z.object({
  itemName: z.string().min(3, { message: "This field has to be filled." }),
  image: z.any(),
  itemDescription: z
    .string()
    .max(300, { message: "Your description is too long." }),
  price: z.string().min(1, { message: "You have to enter a value" }),
});

const NewItemForm = ({ handleAddItem }: any) => {
  const { theme } = useGenerationStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemName: "",
      itemDescription: "",
      price: "0",
      image: null,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newItem = {
      itemName: values.itemName,
      itemDescription: values.itemDescription,
      price: values.price,
      image: values.image,
    };
    handleAddItem(newItem); // Call the function to add item to the category
  };

  return (
    <Form {...form}>
      <form
        style={{
          borderColor: theme?.primary,
          background: theme?.background,
          color: theme?.text,
        }}
        className="w-full flex items-start space-x-4 p-4 rounded-lg border bg-black/50"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FileUploader
          image={""}
          onChange={(files) => {
            // Handle the file change here (you can set the image URL or the image directly)
            const image = files.length > 0 ? files[0] : null;
            form.setValue("image", image); // Set the image in the form state
          }}
        />
        <div className="flex flex-col h-full justify-between space-y-3 w-full">
          <div className="flex space-x-4">
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
          <div className="flex space-x-4">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="itemDescription"
              placeholder="Item description"
            />
            <Button
              style={{
                background: theme?.secondary,
                borderColor: theme?.primary,
                color: theme?.text,
              }}
              className={`h-full ${
                theme &&
                "hover:opacity-80 transition-all duration-200 ease-in-out"
              }`}
              variant="outline"
              type="submit"
            >
              Create <Plus className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default NewItemForm;
