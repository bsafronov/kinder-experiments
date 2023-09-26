import { Button } from "@/shared/ui/button";

type Props = {
  description: React.ReactNode;
};

export function AbsenceFormEntity({ description }: Props) {
  return (
    <div>
      {description}
      <div className="mt-4 flex justify-end">
        <Button>Добавить</Button>
      </div>
    </div>
  );
}
