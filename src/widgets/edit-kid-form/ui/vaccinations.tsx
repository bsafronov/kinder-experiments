import { UseFormReturn } from "react-hook-form";
import { FormType } from "../schema";
import { Combobox } from "@/shared/ui/combobox";
import { Vaccination } from "@prisma/client";

type Props = {
  form: UseFormReturn<FormType>;
  vaccinations: Vaccination[];
};

export function EditKidFormVaccinations({ form, vaccinations }: Props) {
  const selectedVaccinations = form.watch("vaccinations");

  return (
    <div className="space-y-2">
      <h5 className="text-lg font-semibold">Прививки</h5>
      <div className="border rounded-md bg-slate-50 p-4">
        <Combobox
          isMulti
          options={vaccinations.map((v) => ({
            value: v.id,
            label: v.label,
          }))}
          value={selectedVaccinations}
          onChange={(option) => {
            form.setValue("vaccinations", option);
          }}
        />
      </div>
    </div>
  );
}
