"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";

const formSchema = z.object({
  categoryName: z.string().min(3, { message: "This field has to be filled." }),
});

const CategoryForm = ({ handleAddCategory }: any) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryName: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    handleAddCategory(values.categoryName); // Call the parent function to add the category
  };

  return (
    <Form {...form}>
      <form className="w-96" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-end space-x-4">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="categoryName"
            label="Enter category name"
            placeholder="Enter name for your new category"
          />
          <SubmitButton className="text-zinc-900 bg-white" isLoading={false}>
            Create
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
};

export default CategoryForm;
