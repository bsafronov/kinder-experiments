"use client";

import { Badge } from "@/shared/ui/badge";
import { ConfirmDialog } from "@/shared/ui/confirm-dialog";
import { Textarea } from "@/shared/ui/textarea";
import { Note } from "@prisma/client";
import { format } from "date-fns";
import { Check, Edit, Trash2, X } from "lucide-react";
import { useState } from "react";

type Props = {
  note: Note;
  onEdit: () => void;
  onDelete: () => void;
};

export function KidNoteItemEntity({ note, onDelete, onEdit }: Props) {
  const [isEditing, setEditing] = useState(false);

  const { createdAt, description } = note;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Badge>{format(createdAt, "dd.MM.yyyy")}</Badge>

        {!isEditing && (
          <div className="flex gap-2">
            <button
              className="text-slate-500 hover:text-slate-600"
              onClick={() => setEditing(true)}
            >
              <Edit className="w-4 h-4" />
            </button>
            <ConfirmDialog onAction={onDelete}>
              <button className="text-rose-500 hover:text-rose-600">
                <Trash2 className="w-4 h-4" />
              </button>
            </ConfirmDialog>
          </div>
        )}

        {isEditing && (
          <div>
            <button
              className="text-slate-500 hover:text-slate-600"
              onClick={() => setEditing(false)}
            >
              <X className="w-4 h-4" />
            </button>
            <button
              className="text-emerald-500 hover:text-emerald-600"
              onClick={onEdit}
            >
              <Check className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
      {!isEditing && <p>{description}</p>}
      {isEditing && <Textarea value={description} />}
    </div>
  );
}
