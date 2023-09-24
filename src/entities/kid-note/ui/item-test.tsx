type Props = {
  dateNode: React.ReactNode;
  actionsNode: React.ReactNode;
  bodyNode: React.ReactNode;
};

export function KidNoteItemTestEntity({
  bodyNode,
  dateNode,
  actionsNode,
}: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        {dateNode}
        <div className="flex gap-2">{actionsNode}</div>
      </div>
      {bodyNode}
    </div>
  );
}
