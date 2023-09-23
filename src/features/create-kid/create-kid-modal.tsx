"use client";

import z from "zod";
import { Modal } from "@/shared/ui/modal";

export function CreateKidModal() {
  return (
    <Modal
      title="Добавление ребёнка"
      description="Введите ФИО ребёнка"
      query="new"
    >
      123
    </Modal>
  );
}
