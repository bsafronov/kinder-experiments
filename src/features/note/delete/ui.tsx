import { ConfirmDialog } from "@/shared/ui/confirm-dialog";
import { IconButton } from "@/shared/ui/icon-button";
import { Trash2 } from "lucide-react";
import { useApi } from "@/shared/hooks/useApi";
import { NoteState } from "@/entities/note/types";

export function NoteDeleteFeature({ data }: NoteState) {
  const { onSubmit } = useApi({
    method: "delete",
    path: `/api/kids/${data.initial.kidId}/notes/${data.initial.id}`,
    refresh: true,
  });
  return (
    <ConfirmDialog
      onAction={onSubmit}
      description="Примечание будет удалено. Его нельзя будет восстановить."
      variant="destructive"
    >
      <IconButton icon={Trash2} variant={"destructive"} />
    </ConfirmDialog>
  );
}
