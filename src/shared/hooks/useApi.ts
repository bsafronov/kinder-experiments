"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

type Method = "post" | "delete" | "patch";
type SuccessMessages = {
  [key in Method]: string;
};

type Props = {
  path: string;
  method: Method;
  successMessage?: string;
  refresh?: boolean;
};

const successMsg: SuccessMessages = {
  post: "Успешно добавлено!",
  delete: "Успешно удалено!",
  patch: "Успешно обновлено!",
};

export const useApi = <R, T = object>({
  method,
  path,
  successMessage,
  refresh,
}: Props) => {
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [res, setRes] = useState<R | null>(null);
  const router = useRouter();

  const onSubmit = async (values: T) => {
    try {
      setLoading(true);
      const res = await axios[method](path, values as any);
      const data = res.data as R;
      setRes(data);
      setSuccess(true);
      toast.success(successMessage || successMsg[method]);
      refresh && router.refresh();
    } catch {
      toast.error("Ой! Что-то пошло не так...");
    } finally {
      setLoading(false);
    }
  };

  return {
    onSubmit,
    isLoading,
    isSuccess,
    res,
  };
};
