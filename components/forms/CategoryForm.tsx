"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import GradientButton from "../GradientButton";

// Define the schema for the form
const formSchema = z.object({
  categoryName: z.string().min(3, { message: "This field has to be filled." }),
});

// Define the props for the CategoryForm component
interface CategoryFormProps {
  handleAddCategory: (categoryName: string) => void; // Prop to handle adding a category
}

const CategoryForm: React.FC<CategoryFormProps> = ({ handleAddCategory }) => {
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
      <form className="w-72 md:w-96" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-end space-x-4">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="categoryName"
            label="Enter category name"
            placeholder="Enter name for your new category"
          />
          <GradientButton isLoading={false}>
            Create
          </GradientButton>
        </div>
      </form>
    </Form>
  );
};

export default CategoryForm;
