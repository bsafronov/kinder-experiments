import { useState } from "react";

export const useData = <T extends object>(values: T) => {
  const [data, setData] = useState<T>(values);

  const handleSetValue = (value: Partial<T>) => {
    setData((prev) => ({ ...prev, ...value }));
  };

  return {
    data,
    setValue: handleSetValue,
  };
};
