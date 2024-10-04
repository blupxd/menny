"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { Lock, Mail } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";
import SubmitButton from "../SubmitButton";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const formSchema = z
  .object({
    name: z.string().min(1, { message: "This field has to be filled." }),
    lastname: z.string().min(1, { message: "This field has to be filled." }),
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("This is not a valid email."),
    password: z.string().min(1, { message: "You must enter your password" }),
    confirmPassword: z
      .string()
      .min(1, { message: "You must confirm your password." }),
    terms: z.boolean().refine((val) => val === true, {
      message: "Please read and accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const RegisterForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    
    const response = await fetch("/api/auth/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        name: values.name,
        lastname: values.lastname,
        password: values.password,
        terms: values.terms,
      }),
    });
    if (response.ok) {
      router.push("/login");
    } else if(response.status === 409) {
      toast({
        title: "Error",
        description: "The email that you provided is already in use",
        variant: "destructive",
      });
    }else {
      toast({
        title: "Error",
        description: "An error occured!",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="flex space-x-4 mb-4">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Name"
            placeholder="ex. Jhon"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="lastname"
            label="Last name"
            placeholder="ex. Doe"
          />
        </section>
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="johndoe@gmail.com"
          icon={Mail}
        />
        <section className="flex flex-col space-y-4 mt-4">
          <CustomFormField
            fieldType={FormFieldType.PASSWORD}
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter your password"
            icon={Lock}
          />
          <CustomFormField
            fieldType={FormFieldType.PASSWORD}
            control={form.control}
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm your password"
            icon={Lock}
          />
        </section>
        <div className="flex text-xs mt-4 space-x-2 items-center">
          <FormField
            name="terms"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="terms"
                  />
                  <label htmlFor="terms" className="font-medium">
                    I agree with terms & conditions
                  </label>
                  <Link
                    href="/terms-and-conditions"
                    className="text-xs text-neutral-400 underline"
                  >
                    Read terms.
                  </Link>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <SubmitButton className="mt-6 w-full" isLoading={false}>
          Register
        </SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
