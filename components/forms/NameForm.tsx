"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { Button } from "../ui/button";
import { Check } from "lucide-react";
// Define the schema for the form
const formSchema = z.object({
  categoryName: z.string().min(3, { message: "This field has to be filled." }),
});

// Define the props for the NameForm component
interface NameFormProps {
  handleEditName: (name: string) => void;
  categoryName: string;
}

const NameForm: React.FC<NameFormProps> = ({ handleEditName, categoryName }) => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryName: categoryName,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    handleEditName(values.categoryName);
  };

  return (
    <Form {...form}>
      <form className="w-48 md:w-96" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex space-x-2">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="categoryName"
            placeholder="New category name"
          />
          <Button type="submit" size="icon"><Check className="w-4 h-4"/></Button>
        </div>
      </form>
    </Form>
  );
};

export default NameForm;
