"use client";

import { CreateKidModal } from "@/features/create-kid";
import { useEffect, useState } from "react";

export function ModalWidget() {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateKidModal />
    </>
  );
}
