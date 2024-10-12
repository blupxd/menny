import React from "react";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
export enum FormFieldType {
  INPUT = "input",
  PASSWORD = "password",
  TEXTAREA = "textarea",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
  ITEMNAME = "itemName",
}

interface CustomProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  icon?: (field: any) => React.ReactNode;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
  fieldType: FormFieldType;
}
const RenderInput = ({ field, props }: { field: any; props: CustomProps }) => {
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex items-center rounded-md border border-neutral-800 bg-neutral-900">
          {props.icon && <props.icon className="mx-2" />}
          <FormControl>
            <Input
              placeholder={props.placeholder}
              {...field}
              className="border-0"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.ITEMNAME:
      return (
        <div className="flex w-full items-center rounded-md border border-neutral-800 bg-neutral-900">
          {props.icon && <props.icon className="mx-2" />}
          <FormControl>
            <Input
              placeholder={props.placeholder}
              {...field}
              className="border-0 p-2 h-6 text-xs"
            />
          </FormControl>
        </div>
      );

    case FormFieldType.TEXTAREA:
      return (
        <div className="flex w-full items-center rounded-md border border-neutral-800 bg-neutral-900">
          {props.icon && <props.icon className="mx-2" />}
          <FormControl>
            <Textarea
              placeholder={props.placeholder}
              className="resize-none p-1 min-h-max border-1 text-xs"
              {...field}
            />
          </FormControl>
        </div>
      );
    case FormFieldType.PASSWORD:
      return (
        <div className="flex items-center rounded-md border border-neutral-800 bg-neutral-900">
          {props.icon && <props.icon className="mx-2" />}
          <FormControl>
            <Input
              type="password"
              placeholder={props.placeholder}
              {...field}
              className="border-0"
            />
          </FormControl>
        </div>
      );
  }
};
const CustomFormField = (props: CustomProps) => {
  const { control, name, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1 text-purple-300">
          {props.fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel className="font-light">{label}</FormLabel>
          )}
          <RenderInput field={field} props={props} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
