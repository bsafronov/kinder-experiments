"use client";

import { NoteData, NoteItemEntity } from "@/entities/note";
import {
  NoteCancelEditFeature,
  NoteDeleteFeature,
  NoteEditFeature,
  NoteUpdateFeature,
} from "@/features/note";
import { useData } from "@/shared/hooks/useData";
import { Textarea } from "@/shared/ui/textarea";
import { Note } from "@prisma/client";

type Props = {
  note: Note;
};

export function NoteItemWidget({ note }: Props) {
  const state = useData<NoteData>({
    initial: note,
    current: note,
    isEditing: false,
  });

  return (
    <NoteItemEntity
      state={state}
      actions={[
        <NoteEditFeature {...state} />,
        <NoteDeleteFeature {...state} />,
      ]}
      actionsOnEdit={[
        <NoteUpdateFeature {...state} />,
        <NoteCancelEditFeature {...state} />,
      ]}
      bodyOnEdit={
        <Textarea
          className="text-xs"
          value={state.data.current.description}
          onChange={(e) =>
            state.setValue({
              current: { ...state.data.current, description: e.target.value },
            })
          }
        />
      }
    />
  );
}
