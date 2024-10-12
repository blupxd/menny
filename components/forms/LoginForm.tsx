"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { signIn } from "next-auth/react";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { Lock, User } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import GradientButton from "../GradientButton";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z.string().min(1, { message: "You must enter your password" }),
});

const LoginForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const signInData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    if (signInData?.status === 401) {
      toast({
        title: "Error",
        description: "Wrong credentials!",
        variant: "destructive"
      })
      
    } else if (signInData?.status === 200){
      router.replace("/dashboard");
      router.refresh();
    } else if(signInData?.error) {
      toast({
        title: "Error",
        description: "An error occured!",
        variant: "destructive"
      })
    } else if(signInData?.status === 302){
      toast({
        title: "Information",
        description: "There's an account that is registered with Google.",
        variant: "default"
      })
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="flex flex-col space-y-4">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder="johndoe@gmail.com"
            icon={User}
          />
          <CustomFormField
            fieldType={FormFieldType.PASSWORD}
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter your password"
            icon={Lock}
          />
        </section>
        <section className="flex text-xs justify-between mt-6">
          <div className="flex space-x-2 items-center">
            <Checkbox id="remember" className="rounded-lg"/>
            <label htmlFor="remember" className=" font-medium">
              Remember me
            </label>
          </div>
          <Link className="text-purple-300" href="/">
            Forgot your password?
          </Link>
        </section>
        <GradientButton className="mt-6 w-full" isLoading={false}>
          Log in
        </GradientButton>
      </form>
    </Form>
  );
};

export default LoginForm;
