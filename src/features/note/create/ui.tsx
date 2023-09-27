"use client";
import { NoteFormEntity } from "@/entities/note";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Textarea } from "@/shared/ui/textarea";
import { useNoteCreateForm } from "./model";
import { useApi } from "@/shared/hooks/useApi";
import { useAuth } from "@clerk/nextjs";
import { useParams } from "next/navigation";

export function NoteCreateFeature() {
  const { userId } = useAuth();
  const { kidId } = useParams();
  const { form } = useNoteCreateForm();
  const { onSubmit } = useApi({
    method: "post",
    path: `/api/kids/${kidId}/notes`,
    onSuccess: () => {
      form.reset();
    },
    refresh: true,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <NoteFormEntity
          description={
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Новое примечание</FormLabel>
                  <Textarea {...field} className="text-xs" />
                  <FormMessage />
                </FormItem>
              )}
            />
          }
        />
      </form>
    </Form>
  );
}
