"use client";
import { Form } from "@/shared/ui/form";
import { useAbsenceCreateModel } from "./model";

import { AbsenceFormEntity } from "@/entities/absence";
import { useApi } from "@/shared/hooks/useApi";

type Props = {
  userId: string;
  kidId: string;
};

export function AbsenceCreateFeature({ kidId, userId }: Props) {
  const { form, values } = useAbsenceCreateModel();
  const { onSubmit } = useApi({
    method: "post",
    path: `/api/kids/${kidId}/absences`,
    values,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <AbsenceFormEntity />
      </form>
    </Form>
  );
}
