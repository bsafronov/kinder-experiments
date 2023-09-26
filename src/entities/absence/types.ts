import { Absence } from "@prisma/client";

export type AbsenceData = {
  readonly initial: Absence;
  current: Absence;
  isEditing: boolean;
};

export type AbsenceState = {
  data: AbsenceData;
  setValue: (value: Partial<AbsenceData>) => void;
};
