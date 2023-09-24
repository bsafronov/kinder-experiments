"use client";
import { UseFormReturn } from "react-hook-form";
import { FormType } from "../schema";
import { Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/shared/ui/badge";
import { FormItem, FormLabel } from "@/shared/ui/form";
import { Textarea } from "@/shared/ui/textarea";
import { Button } from "@/shared/ui/button";
type Props = {
  form: UseFormReturn<FormType>;
};

export function EditKidFormNotes({ form }: Props) {
  const notes = form.watch("notes");

  return (
    <div className="space-y-2">
      <h5 className="text-lg font-semibold">Примечания</h5>
      <div className="border divide-y rounded-md bg-slate-50">
        {/* TODO: Список примечаний из БД */}
        <div className="p-4">
          <div className="mb-2 flex items-center gap-4">
            <Badge>{format(new Date(), "dd.MM.yyyy")}</Badge>
            <div className="flex gap-2">
              <button className="text-slate-500 hover:text-slate-600">
                <Edit className="w-4 h-4" />
              </button>
              <button className="text-rose-500 hover:text-rose-600">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
            nobis placeat nesciunt repudiandae commodi minus animi odio
            voluptate assumenda, est, iusto ea dolores magni, error doloremque
            illo ut esse. Distinctio!
          </p>
        </div>
        {/* TODO: Форма заполнения нового примечания */}
        <div className="p-4">
          <FormItem>
            <FormLabel>Новое примечание</FormLabel>
            <Textarea />
          </FormItem>
          <div className="mt-4 flex justify-end">
            <Button>Добавить</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
