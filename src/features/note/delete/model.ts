import { Note } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Props = {
  note: Note;
};

export const useNoteDelete = ({ note }: Props) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `/api/kids/${note.kidId}/notes/${note.id}`
      );
      toast.success("Примечание успешно удалено!");
      router.refresh();
    } catch {
      toast.error("Ой! Произошла ошибка.");
    }
  };

  return {
    handleDelete,
  };
};
