import { UseFormReturn } from "react-hook-form";
import { FormType } from "../schema";
import { FormItem, FormLabel } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Combobox } from "@/shared/ui/combobox";
import { parentRoles } from "@/shared/consts/parent-roles";
import { Button } from "@/shared/ui/button";
import { Plus, X } from "lucide-react";
import { ConfirmDialog } from "@/shared/ui/confirm-dialog";

type Props = {
  form: UseFormReturn<FormType>;
};

export function EditKidFormParents({ form }: Props) {
  const parents = form.watch("parents");
  const handleAddParent = () => {
    form.setValue("parents", [
      ...parents,
      {
        role: "",
        firstName: "",
        middleName: "",
        lastName: "",
      },
    ]);
  };
  const handleChangeParentField = ({
    field,
    index,
    value,
  }: {
    index: number;
    field: keyof (typeof parents)[0];
    value: string;
  }) => {
    form.setValue("parents", [
      ...parents.slice(0, index),
      {
        ...parents[index],
        [field]: value,
      },
      ...parents.slice(index + 1),
    ]);
  };

  const handleDeleteParent = (index: number) => {
    form.setValue("parents", [
      ...parents.slice(0, index),
      ...parents.slice(index + 1),
    ]);
  };

  return (
    <div className="space-y-2">
      <h5 className="text-lg font-semibold">Родители</h5>
      <div className="divide-y border rounded-md bg-slate-50">
        {parents.map((_, index) => (
          <div className="space-y-2" key={index}>
            <div className="relative grid grid-cols-3 gap-2 p-4">
              <ConfirmDialog
                variant="destructive"
                description="Действие может быть отменено перезагрузкой страницы без сохранения изменений."
                onAction={() => handleDeleteParent(index)}
              >
                <button className="absolute top-4 right-4 text-rose-500 hover:text-rose-600">
                  <X className="w-4 h-4" />
                </button>
              </ConfirmDialog>
              <FormItem>
                <FormLabel>Роль</FormLabel>
                <Combobox
                  options={parentRoles.map((role) => ({
                    value: role,
                    label: role,
                  }))}
                  value={{
                    label: parents[index].role,
                    value: parents[index].role,
                  }}
                  onChange={(value) =>
                    handleChangeParentField({
                      value: value.label,
                      index,
                      field: "role",
                    })
                  }
                />
              </FormItem>
              <FormItem className="row-start-2">
                <FormLabel>Фамилия</FormLabel>
                <Input
                  value={parents[index].lastName || ""}
                  onChange={(e) =>
                    handleChangeParentField({
                      value: e.target.value,
                      index,
                      field: "lastName",
                    })
                  }
                />
              </FormItem>
              <FormItem className="row-start-2">
                <FormLabel>Имя</FormLabel>
                <Input
                  value={parents[index].firstName || ""}
                  onChange={(e) =>
                    handleChangeParentField({
                      value: e.target.value,
                      index,
                      field: "firstName",
                    })
                  }
                />
              </FormItem>
              <FormItem className="row-start-2">
                <FormLabel>Отчество</FormLabel>
                <Input
                  value={parents[index].middleName || ""}
                  onChange={(e) =>
                    handleChangeParentField({
                      value: e.target.value,
                      index,
                      field: "middleName",
                    })
                  }
                />
              </FormItem>
            </div>
          </div>
        ))}
        <div className="p-4">
          <Button
            variant={"outline"}
            type="button"
            className="gap-x-1"
            onClick={handleAddParent}
          >
            <Plus className="w-4 h-4" />
            Добавить родителя
          </Button>
        </div>
      </div>
    </div>
  );
}
