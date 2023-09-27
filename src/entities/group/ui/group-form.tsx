import { Button } from "@/shared/ui/button";

type Props = {
  title: React.ReactNode;
};

export function GroupFormEntity({ title }: Props) {
  return (
    <div>
      {title}
      <div className="mt-4 flex justify-end">
        <Button>Создать</Button>
      </div>
    </div>
  );
}
