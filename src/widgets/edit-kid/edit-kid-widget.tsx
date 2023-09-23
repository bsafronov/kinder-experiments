"use client";

import z from "zod";
import { Absence, Kid, Parent, Vaccination } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import toast from "react-hot-toast";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { Plus } from "lucide-react";
import { Combobox } from "@/shared/ui/combobox";
import { parentRoles } from "@/shared/consts/parent-roles";

const formSchema = z.object({
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
      label: z.string(),
    })
  ),
  absences: z.array(
    z.object({
      date: z.string(),
      reason: z.string().nullable(),
    })
  ),
});

type FormType = z.infer<typeof formSchema>;

type Props = {
  kid: Kid & {
    parents: Parent[];
    vaccinations: Vaccination[];
    absences: Absence[];
  };
};

export function EditKidWidget({ kid }: Props) {
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
    },
  });

  const parents = form.watch("parents");

  const onSubmit = async (values: FormType) => {
    try {
      console.log(values);

      // const res = await axios.patch(`/api/kids/${kid.id}`, values);
      toast.success("Данные обновлены!");
    } catch {
      toast.error("Что-то пошло не так...");
    }
  };

  const handleAddParent = () => {
    form.setValue("parents", [
      ...form.getValues("parents"),
      {
        role: "",
        firstName: "",
        middleName: "",
        lastName: "",
      },
    ]);
  };

  const handleChangeParentField = ({
    field,
    index,
    value,
  }: {
    index: number;
    field: string;
    value: string;
  }) => {
    form.setValue("parents", [
      ...parents.slice(0, index),
      {
        ...parents[index],
        [field]: value,
      },
      ...parents.slice(index + 1),
    ]);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-8">Редактирование ребёнка</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-2">
            <h5 className="text-lg font-semibold">Основные данные</h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2 p-4 border rounded-md bg-slate-50">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Фамилия</FormLabel>
                    <FormControl>
                      <Input placeholder="Иванов" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Имя</FormLabel>
                    <FormControl>
                      <Input placeholder="Иван" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="middleName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Отчество</FormLabel>
                    <FormControl>
                      <Input placeholder="Иванович" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Дата рождения</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="omsPolicy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Полис ОМС</FormLabel>
                    <FormControl>
                      <Input placeholder="1111 2222 3333 4444" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="adress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Домашний адрес</FormLabel>
                    <FormControl>
                      <Input placeholder="ул. Руднёвка, д. 33" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="space-y-2">
            <h5 className="text-lg font-semibold">Родители</h5>
            <div className="space-y-4 divide-y border rounded-md bg-slate-50">
              {parents.map((_, index) => (
                <div className="space-y-2 p-4 " key={index}>
                  <div className="grid grid-cols-3 gap-2">
                    <FormField
                      control={form.control}
                      name="parents"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Роль</FormLabel>
                          <Combobox
                            options={parentRoles.map((role) => ({
                              value: role,
                              label: role,
                            }))}
                            value={field.value[index].role}
                            onChange={(value) =>
                              handleChangeParentField({
                                value,
                                index,
                                field: "role",
                              })
                            }
                          />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <FormField
                      control={form.control}
                      name="parents"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Фамилия</FormLabel>
                          <Input
                            value={field.value[index].lastName || ""}
                            onChange={(e) =>
                              handleChangeParentField({
                                value: e.target.value,
                                index,
                                field: "lastName",
                              })
                            }
                          />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="parents"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Имя</FormLabel>
                          <Input
                            value={field.value[index].firstName || ""}
                            onChange={(e) =>
                              handleChangeParentField({
                                value: e.target.value,
                                index,
                                field: "firstName",
                              })
                            }
                          />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="parents"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Отчество</FormLabel>
                          <Input
                            value={field.value[index].middleName || ""}
                            onChange={(e) =>
                              handleChangeParentField({
                                value: e.target.value,
                                index,
                                field: "middleName",
                              })
                            }
                          />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}
              <div className="p-4">
                <Button
                  variant={"outline"}
                  type="button"
                  className="gap-x-1"
                  onClick={handleAddParent}
                >
                  <Plus className="w-4 h-4" />
                  Добавить родителя
                </Button>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h5 className="text-lg font-semibold">Прививки</h5>
            <div className=""></div>
          </div>
          <div className="flex justify-end">
            <Button>Сохранить</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
