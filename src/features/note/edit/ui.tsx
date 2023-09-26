import { NoteState } from "@/entities/note/types";
import { IconButton } from "@/shared/ui/icon-button";
import { Edit } from "lucide-react";

export function NoteEditFeature({ setValue }: NoteState) {
  return (
    <IconButton
      icon={Edit}
      variant={"default"}
      onClick={() => setValue({ isEditing: true })}
    />
  );
}
