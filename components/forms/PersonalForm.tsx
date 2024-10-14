"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";

interface PersonalFormProps {
  name: string;
  lastName: string;
  email: string;
  setData: (data: any) => void;
  disabled: boolean;
}

const PersonalForm = ({
  name,
  lastName,
  email,
  setData,
  disabled,
}: PersonalFormProps) => {
  const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required." }),
    lastName: z.string().min(1, { message: "Last name is required." }),
    email: disabled
      ? z.string().optional()
      : z
          .string()
          .min(1, { message: "Email is required." })
          .email("This is not a valid email."),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name,
      lastName,
      email,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setData(values);
  };

  return (
    <Form {...form}>
      <form onChange={form.handleSubmit(onSubmit)}>
        <section className="flex flex-col">
          <div className="flex items-start space-x-4 mb-4">
            <CustomFormField
              fieldType={FormFieldType.ITEMNAME}
              control={form.control}
              name="name"
              label="First Name"
              placeholder="John"
            />
            <CustomFormField
              fieldType={FormFieldType.ITEMNAME}
              control={form.control}
              name="lastName"
              label="Last Name"
              placeholder="Doe"
            />
          </div>
          {disabled && (
            <p className="text-xs text-red-500">
              You can&apos;t change your email because you are signed in with google
            </p>
          )}
          <CustomFormField
            fieldType={FormFieldType.ITEMNAME}
            control={form.control}
            name="email"
            disabled={disabled}
            placeholder="johndoe@gmail.com"
            icon={EnvelopeClosedIcon}
          />
        </section>
      </form>
    </Form>
  );
};

export default PersonalForm;
