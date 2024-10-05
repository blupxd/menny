"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { Button } from "../ui/button";
import { useGenerationStore } from "@/lib/themeSelect";

const formSchema = z.object({
  categoryName: z.string().min(3, { message: "This field has to be filled." }),
});

const NameForm = ({ handleEditName, categoryName }: any) => {
  const { theme } = useGenerationStore();
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
      <form className="w-96" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex space-x-4">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="categoryName"
            placeholder="New category name"
          />
          <Button type="submit">Confirm</Button>
        </div>
      </form>
    </Form>
  );
};

export default NameForm;
