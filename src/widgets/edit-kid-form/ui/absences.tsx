import { UseFormReturn } from "react-hook-form";
import { FormType } from "../schema";
import { Button } from "@/shared/ui/button";
import { Plus, X } from "lucide-react";
import { FormItem, FormLabel } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { ConfirmDialog } from "@/shared/ui/confirm-dialog";

type Props = {
  form: UseFormReturn<FormType>;
};

export function EditKidFormAbsences({ form }: Props) {
  const absences = form.watch("absences");

  const handleAddAbsence = () => {
    form.setValue("absences", [
      ...absences,
      {
        date: "",
        reason: "",
      },
    ]);
  };

  const handleChangeAbsenceField = ({
    field,
    index,
    value,
  }: {
    index: number;
    field: keyof (typeof absences)[0];
    value: string;
  }) => {
    form.setValue("absences", [
      ...absences.slice(0, index),
      {
        ...absences[index],
        [field]: value,
      },
      ...absences.slice(index + 1),
    ]);
  };

  const handleDeleteAbsence = (index: number) => {
    form.setValue("absences", [
      ...absences.slice(0, index),
      ...absences.slice(index + 1),
    ]);
  };

  return (
    <div className="space-y-2">
      <h5 className="text-lg font-semibold">Дни отсутствия</h5>
      <div className="divide-y border rounded-md bg-slate-50">
        {absences.map((_, index) => (
          <div className="relative p-4" key={index}>
            <ConfirmDialog
              variant="destructive"
              description="Действие может быть отменено перезагрузкой страницы без сохранения изменений."
              onAction={() => handleDeleteAbsence(index)}
            >
              <button className="absolute top-4 right-4 text-rose-500 hover:text-rose-600">
                <X className="w-4 h-4" />
              </button>
            </ConfirmDialog>
            <FormItem>
              <FormLabel>Дата</FormLabel>
              <Input
                type="date"
                value={absences[index].date || ""}
                onChange={(e) =>
                  handleChangeAbsenceField({
                    value: e.target.value,
                    index,
                    field: "date",
                  })
                }
              />
            </FormItem>
            <FormItem>
              <FormLabel>Причина</FormLabel>
              <Textarea
                value={absences[index].reason || ""}
                placeholder="Поле не обязательное для заполнения"
                onChange={(e) =>
                  handleChangeAbsenceField({
                    value: e.target.value,
                    index,
                    field: "reason",
                  })
                }
              />
            </FormItem>
          </div>
        ))}
        <div className="p-4">
          <Button
            variant={"outline"}
            type="button"
            className="gap-x-1"
            onClick={handleAddAbsence}
          >
            <Plus className="w-4 h-4" />
            Добавить день
          </Button>
        </div>
      </div>
    </div>
  );
}
