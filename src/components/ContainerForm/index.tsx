import { cn } from "@/lib/utils";
import { createContext, ReactNode } from "react";
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form";
import { ObjectSchema } from "yup";

export const SchemaContext = createContext<ObjectSchema<any> | null>(null);

interface ContainerFormProps<T extends FieldValues> {
  children: ReactNode;
  methods: UseFormReturn<T>;
  schema: ObjectSchema<any>;
  className?: string;
  onEnterPress?: () => void;
}

export const ContainerForm = <T extends FieldValues>({
  methods,
  schema,
  children,
  className,
  onEnterPress,
}: ContainerFormProps<T>) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && onEnterPress) {
      onEnterPress();
    }
  };

  return (
    <SchemaContext.Provider value={schema}>
      <FormProvider {...methods}>
        <div className={cn("gap-3", className)} onKeyDown={handleKeyDown}>
          {children}
        </div>
      </FormProvider>
    </SchemaContext.Provider>
  );
};
