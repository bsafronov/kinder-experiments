"use client";
import { Absence, Kid, Note, Parent, Vaccination } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/shared/ui/form";
import toast from "react-hot-toast";
import { Button } from "@/shared/ui/button";
import { EditKidFormAbsences } from "./ui/absences";
import { FormType, formSchema } from "./schema";
import { EditKidFormMainInfo } from "./ui/main-info";
import { EditKidFormParents } from "./ui/parents";
import { EditKidFormVaccinations } from "./ui/vaccinations";
import { EditKidFormNotes } from "./ui/notes";

type Props = {
  kid: Kid & {
    parents: Parent[];
    vaccinations: Vaccination[];
    absences: Absence[];
    notes: Note[];
  };
  vaccinations: Vaccination[];
};

export function EditKidFormWidget({ kid, vaccinations }: Props) {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: kid.firstName,
      lastName: kid.lastName,
      middleName: kid.middleName,
      adress: kid.adress || "",
      omsPolicy: kid.omsPolicy || "",
      birthDate: kid.birthDate || "",
      parents: kid.parents,
      vaccinations: kid.vaccinations,
      absences: kid.absences,
      notes: kid.notes,
    },
  });

  const onSubmit = async (values: FormType) => {
    try {
      console.log(values);

      // const res = await axios.patch(`/api/kids/${kid.id}`, values);
      toast.success("Данные обновлены!");
    } catch {
      toast.error("Что-то пошло не так...");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-8">Редактирование ребёнка</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <EditKidFormMainInfo form={form} />
          <EditKidFormParents form={form} />
          <EditKidFormVaccinations form={form} vaccinations={vaccinations} />
          <EditKidFormAbsences form={form} />
          <EditKidFormNotes form={form} />
          <div className="flex justify-end gap-x-2">
            <Button variant={"destructive"} type="button">
              Удалить
            </Button>
            <Button>Сохранить</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
