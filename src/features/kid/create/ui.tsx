"use client";

import { FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
import { useKidCreateModel } from "./model";
import { KidFormEntity } from "@/entities/kid";
import { Input } from "@/shared/ui/input";
import { useApi } from "@/shared/hooks/useApi";
import { useParams, useRouter } from "next/navigation";
import { Kid } from "@prisma/client";
import { useEffect } from "react";

type Props = {
  isModal?: boolean;
};

export function KidCreateFeature({ isModal }: Props) {
  const { form } = useKidCreateModel();
  const { groupId } = useParams();
  const router = useRouter();
  const { onSubmit, res, isSuccess } = useApi<Kid>({
    method: "post",
    path: `/api/groups/${groupId}/kids`,
  });

  useEffect(() => {
    router.push(`/groups/${groupId}/kids/${res?.id}`);
  }, [isSuccess]);

  return (
    <KidFormEntity
      form={form}
      onSubmit={onSubmit}
      isModal={isModal}
      lastName={
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Фамилия</FormLabel>
              <Input {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
      }
      firstName={
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя</FormLabel>
              <Input {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
      }
      middleName={
        <FormField
          control={form.control}
          name="middleName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Отчество</FormLabel>
              <Input {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
      }
    />
  );
}
