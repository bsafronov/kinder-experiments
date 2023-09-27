import { Button } from "@/shared/ui/button";

type Props = {
  select: React.ReactNode;
  date: React.ReactNode;
};

export function AbsenceFormEntity({ date, select }: Props) {
  return (
    <div>
      {date}
      {select}
      <div className="mt-4 flex justify-end">
        <Button>Добавить</Button>
      </div>
    </div>
  );
}
