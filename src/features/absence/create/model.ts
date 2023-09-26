import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({});

export type SchemaType = z.infer<typeof formSchema>;

export const useAbsenceCreateModel = () => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  return { form, values: form.getValues() };
};
