import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Method = "post" | "delete" | "patch";
type SuccessMessages = {
  [key in Method]: string;
};

type Props = {
  path: string;
  method: Method;
  successMessage?: string;
  onSuccess?: () => void;
  refresh?: boolean;
};

const successMsg: SuccessMessages = {
  post: "Успешно добавлено!",
  delete: "Успешно удалено!",
  patch: "Успешно обновлено!",
};

export const useApi = <T>({
  method,
  path,
  successMessage,
  onSuccess,
  refresh,
}: Props) => {
  const router = useRouter();

  const onSubmit = async (values: T) => {
    try {
      const res = await axios[method](path, values as any);
      toast.success(successMessage || successMsg[method]);
      onSuccess && onSuccess();
      refresh && router.refresh();
    } catch {
      toast.error("Ой! Что-то пошло не так...");
    }
  };

  return {
    onSubmit,
  };
};
