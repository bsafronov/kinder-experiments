import { Button } from "@/shared/ui/button";

type Props = {
  date: React.ReactNode;
  select: React.ReactNode;
};

export function VaccinationFormEntity({ date, select }: Props) {
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
