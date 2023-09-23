"use client";

import { Button } from "@/shared/ui/button";
import { Plus } from "lucide-react";
import { useQueryParams } from "@/shared/hooks/useQueryParams";

export function CreateKidFeature() {
  const { pushQuery } = useQueryParams();

  return (
    <div>
      <Button
        variant={"outline"}
        className="gap-x-2"
        onClick={() => pushQuery({ modal: "new" })}
      >
        <Plus className="w-4 h-4" />
        Добавить ребёнка
      </Button>
    </div>
  );
}
