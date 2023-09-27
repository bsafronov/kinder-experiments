import { Vaccination } from "@prisma/client";

export type VaccinationData = {
  readonly initial: Vaccination;
  current: Vaccination;
  isEditing: boolean;
};

export type VaccinationState = {
  data: VaccinationData;
  setValue: (value: Partial<VaccinationData>) => void;
};
