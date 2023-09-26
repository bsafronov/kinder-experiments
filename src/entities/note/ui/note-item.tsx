import { Badge } from "@/shared/ui/badge";
import { format } from "date-fns";
import { Fragment } from "react";
import { NoteState } from "..";

type Props = {
  state: NoteState;
  actions: React.ReactNode[];
  actionsOnEdit: React.ReactNode[];
  bodyOnEdit: React.ReactNode;
};

export function NoteItemEntity({
  state,
  actions,
  actionsOnEdit,
  bodyOnEdit,
}: Props) {
  const {
    data: { initial, isEditing },
  } = state;

  return (
    <div>
      <div className="flex mb-2 justify-between items-center">
        <div className="flex gap-4">
          <Badge>
            {format(new Date(initial.createdAt || Date.now()), "dd.MM.yyyy")}
          </Badge>
          <div className="flex items-center gap-2">
            {!isEditing &&
              actions.map((action, index) => (
                <Fragment key={index}>{action}</Fragment>
              ))}
            {isEditing &&
              actionsOnEdit.map((action, index) => (
                <Fragment key={index}>{action}</Fragment>
              ))}
          </div>
        </div>
        <div className="flex gap-2 text-xs">
          {initial.createdAt.toISOString() !==
            initial.updatedAt.toISOString() && (
            <div>(изм. {format(initial.updatedAt, "dd.MM.yyyy")})</div>
          )}
          <div className="text-muted-foreground">
            {format(initial.createdAt, "dd.MM.yyyy")}
          </div>
        </div>
      </div>
      {!isEditing && <p className="text-xs">{initial.description}</p>}
      {isEditing && bodyOnEdit}
    </div>
  );
}
