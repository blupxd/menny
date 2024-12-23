"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import GradientButton from "../GradientButton";
import { useState } from "react";

const formSchema = z.object({
  menuName: z.string().min(3, { message: "This field has to be filled." }),
});

const MenuForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      menuName: "",
    },
  });

  const menuName = form.watch("menuName"); // Watch the menuName field

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const response = await fetch("/api/menu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        menuName: values.menuName,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      router.push(`/dashboard/menu/${data.menu.id}`);
    } else {
      toast({
        title: "Error",
        description: "Oops! Something went wrong!",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        className="w-96"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex items-end space-x-4">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="menuName"
            label="Menu Name"
            placeholder="Enter name for your new menu"
          />
          <GradientButton
            disabled={menuName.length < 3} // Disable button until 3 characters are entered
            isLoading={loading}
          >
            Create
          </GradientButton>
        </div>
      </form>
    </Form>
  );
};

export default MenuForm;
