"use client";
import { Form, FormField, FormItem, FormLabel } from "@/shared/ui/form";
import { useAbsenceCreateModel } from "./model";

import { AbsenceFormEntity } from "@/entities/absence";
import { useApi } from "@/shared/hooks/useApi";
import { Input } from "@/shared/ui/input";
import { Combobox } from "@/shared/ui/combobox";
import { Vaccination } from "@prisma/client";

type Props = {
  vaccinations: Vaccination[];
  userId: string;
  kidId: string;
};

export function AbsenceCreateFeature({ kidId, userId, vaccinations }: Props) {
  const { form } = useAbsenceCreateModel();
  const { onSubmit } = useApi({
    method: "post",
    path: `/api/kids/${kidId}/absences`,
    refresh: true,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <AbsenceFormEntity
          date={
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Дата привития</FormLabel>
                  <Input {...field} type="date" />
                </FormItem>
              )}
            />
          }
          select={
            <FormField
              control={form.control}
              name="vaccination"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Прививка</FormLabel>
                  <Combobox
                    value={field.value}
                    options={vaccinations.map((v) => ({
                      value: v.id,
                      label: v.label,
                    }))}
                    onChange={(value) => form.setValue("vaccination", value)}
                  />
                </FormItem>
              )}
            />
          }
        />
      </form>
    </Form>
  );
}
