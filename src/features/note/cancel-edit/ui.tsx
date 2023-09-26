import { NoteState } from "@/entities/note";
import { IconButton } from "@/shared/ui/icon-button";
import { X } from "lucide-react";

export function NoteCancelEditFeature({ data, setValue }: NoteState) {
  return (
    <IconButton
      icon={X}
      onClick={() => setValue({ isEditing: false, current: data.initial })}
    />
  );
}
