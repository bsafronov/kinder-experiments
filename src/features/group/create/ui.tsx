"use client";

import { useApi } from "@/shared/hooks/useApi";
import { useGroupCreateForm } from "./model";
import { useRouter } from "next/navigation";
import { Group } from "@prisma/client";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { GroupFormEntity } from "@/entities/group";
import { Input } from "@/shared/ui/input";
import { useEffect } from "react";

export function GroupCreateFeature() {
  const router = useRouter();
  const { form } = useGroupCreateForm();
  const { isLoading, isSuccess, onSubmit, res } = useApi<Group>({
    method: "post",
    path: "/api/groups",
  });

  useEffect(() => {
    router.push(res?.id || "");
  }, [isSuccess]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <GroupFormEntity
          title={
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название</FormLabel>
                  <Input {...field} disabled={isLoading} />
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
