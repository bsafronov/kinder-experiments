"use client";

import { useApi } from "@/shared/hooks/useApi";
import { Button } from "@/shared/ui/button";
import { ConfirmDialog } from "@/shared/ui/confirm-dialog";
import { Group } from "@prisma/client";
import { useParams } from "next/navigation";

export function GroupDeleteFeature() {
  const { groupId } = useParams();

  const { onSubmit } = useApi<Group>({
    method: "delete",
    path: `/api/groups/${groupId}`,
    refresh: true,
  });

  return (
    <ConfirmDialog onAction={onSubmit} variant="destructive">
      <Button variant={"destructive"}>Удалить</Button>
    </ConfirmDialog>
  );
}
