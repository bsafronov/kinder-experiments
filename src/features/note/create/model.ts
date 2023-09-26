import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  description: z.string(),
});

type SchemaType = z.infer<typeof formSchema>;

export const useNoteCreateForm = () => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
    },
  });

  return {
    form,
  };
};
