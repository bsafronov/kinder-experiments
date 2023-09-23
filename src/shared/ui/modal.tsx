"use client";

import { useQueryParams } from "@/shared/hooks/useQueryParams";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { useSearchParams } from "next/navigation";
import { forwardRef } from "react";

type Props = {
  title?: string;
  description?: string;
  query?: string;
  children?: React.ReactNode;
};

export const Modal = forwardRef<React.ElementRef<typeof DialogContent>, Props>(
  ({ children, description, title, query }, ref) => {
    const { pushQuery } = useQueryParams();
    const isOpen = useSearchParams().get("modal") === query;

    if (!isOpen) {
      return null;
    }

    return (
      <Dialog open onOpenChange={() => pushQuery({ modal: [] })}>
        <DialogContent ref={ref}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }
);
