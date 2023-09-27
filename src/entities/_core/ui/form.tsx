import { Button } from "@/shared/ui/button";
import { Form } from "@/shared/ui/form";
import { UseFormReturn } from "react-hook-form";

type Props = {
  children?: React.ReactNode;
  form?: UseFormReturn<any>;
  onSubmit?: (data: any) => void;
};

export function FormEntity({ children, form, onSubmit }: Props) {
  if (!form || !onSubmit) return <>{children}</>;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        {children}
        <div className="mt-2 flex justify-end">
          <Button type="submit">Добавить</Button>
        </div>
      </form>
    </Form>
  );
}
