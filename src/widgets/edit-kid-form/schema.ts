import z from "zod";

export const formSchema = z.object({
  firstName: z.string().min(1, { message: "Обязательное поле" }),
  lastName: z.string().min(1, { message: "Обязательное поле" }),
  middleName: z.string().min(1, { message: "Обязательное поле" }),
  adress: z.string(),
  omsPolicy: z.string(),
  birthDate: z.string(),
  parents: z.array(
    z.object({
      role: z.string(),
      firstName: z.string().nullable(),
      middleName: z.string().nullable(),
      lastName: z.string().nullable(),
    })
  ),
  vaccinations: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    })
  ),
  notes: z.array(
    z.object({
      description: z.string(),
    })
  ),
  absences: z.array(
    z.object({
      date: z.string(),
      reason: z.string().nullable(),
    })
  ),
});

export type FormType = z.infer<typeof formSchema>;
