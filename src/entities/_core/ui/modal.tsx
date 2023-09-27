"use client";

import { useQueryParams } from "@/shared/hooks/useQueryParams";
import { Button } from "@/shared/ui/button";
import { Modal } from "@/shared/ui/modal";

type Props = {
  modalButtonContent?: React.ReactNode | string;
  children?: React.ReactNode;
  title?: string;
  query?: string;
  description?: string;
};

export function ModalEntity({
  children,
  description,
  title,
  query,
  modalButtonContent,
}: Props) {
  const { pushQuery } = useQueryParams();

  if (!modalButtonContent || !title || !query) {
    return <>{children}</>;
  }

  return (
    <>
      <Button
        variant={"outline"}
        className="gap-x-2"
        type="button"
        onClick={() => pushQuery({ modal: query })}
      >
        {modalButtonContent}
      </Button>
      <Modal query={query} title={title} description={description}>
        {children}
      </Modal>
    </>
  );
}
