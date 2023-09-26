import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";
import { buttonVariants } from "./button";

type Props = {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  onAction: (values?: any) => void;
};

export function ConfirmDialog({
  children,
  onAction,
  description,
  title,
  variant = "default",
}: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title || "Вы уверены?"}</AlertDialogTitle>
          <AlertDialogDescription>
            {description || "Это действие нельзя будет отменить."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction
            onClick={onAction}
            className={buttonVariants({ variant })}
          >
            {variant === "default" ? "Подтвердить" : "Удалить"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
