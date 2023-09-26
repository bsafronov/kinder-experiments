import { Note } from "@prisma/client";

export type NoteData = {
  readonly initial: Note;
  current: Note;
  isEditing: boolean;
};

export type NoteState = {
  data: NoteData;
  setValue: (value: Partial<NoteData>) => void;
};
