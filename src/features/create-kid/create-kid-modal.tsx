"use client";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "@/shared/ui/modal";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import { Kid } from "@prisma/client";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "Обязательное поле" }),
  lastName: z.string().min(1, { message: "Обязательное поле" }),
  middleName: z.string().min(1, { message: "Обязательное поле" }),
});

type FormType = z.infer<typeof formSchema>;

export function CreateKidModal() {
  const router = useRouter();
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      middleName: "",
    },
  });

  const onSubmit = async (values: FormType) => {
    try {
      const res = await axios.post("/api/kids", values);
      const kid = res.data as Kid;
      toast.success("Ребёнок успешно добавлен");
      router.push(`/kids/${kid.id}`);
      router.refresh();
    } catch {
      toast.error("Что-то пошло не так...");
    }
  };

  return (
    <Modal
      title="Добавление ребёнка"
      description="Введите ФИО ребёнка"
      query="new"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          <div className="flex justify-end">
            <Button>Добавить</Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
