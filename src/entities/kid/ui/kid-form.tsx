"use client";
import { Entity } from "@/entities/_core";
import { useQueryParams } from "@/shared/hooks/useQueryParams";
import { Button } from "@/shared/ui/button";
import { Plus } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

type Props = {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  isModal?: boolean;
  firstName: React.ReactNode;
  middleName: React.ReactNode;
  lastName: React.ReactNode;
};

const KidFormOpenModalButton = () => {
  const { pushQuery } = useQueryParams();
  return (
    <Button
      variant={"outline"}
      className="gap-x-2"
      type="button"
      onClick={() => pushQuery({ modal: "new" })}
    >
      <Plus className="w-4 h-4" />
      Добавить ребёнка
    </Button>
  );
};

export function KidFormEntity<T>({
  form,
  onSubmit,
  firstName,
  lastName,
  middleName,
}: Props) {
  return (
    <Entity
      form={form}
      onSubmit={onSubmit}
      modalButtonContent={
        <>
          <Plus className="w-4 h-4" />
          Добавить ребёнка
        </>
      }
      modalQuery="new"
      modalTitle="Добавление ребёнка"
    >
      {lastName}
      {firstName}
      {middleName}
    </Entity>
  );
}
