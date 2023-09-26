import { NoteState } from "@/entities/note";
import { useApi } from "@/shared/hooks/useApi";
import { IconButton } from "@/shared/ui/icon-button";
import { Note } from "@prisma/client";
import { Check } from "lucide-react";

export function NoteUpdateFeature({ data, setValue }: NoteState) {
  const { onSubmit } = useApi<Note>({
    method: "patch",
    path: `/api/kids/${data.initial.kidId}/notes/${data.initial.id}`,
  });

  const handleUpdate = () => {
    onSubmit(data.current);
    setValue({ isEditing: false, initial: data.current });
  };

  return (
    <IconButton
      icon={Check}
      variant={"success"}
      disabled={data.current.description === ""}
      onClick={handleUpdate}
    />
  );
}
