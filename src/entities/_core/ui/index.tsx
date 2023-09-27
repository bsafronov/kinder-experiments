import { UseFormReturn } from "react-hook-form";
import { ModalEntity } from "./modal";
import { FormEntity } from "./form";

type CommonProps = {
  children?: React.ReactNode;
};

type IsModalProps = {
  modalButtonContent: React.ReactNode | string;
  modalTitle: string;
  modalQuery: string;
  modalDescription?: string;
};
type NoModalProps = {
  modalButtonContent?: never;
  modalTitle?: never;
  modalQuery?: never;
  modalDescription?: never;
};
type ModalProps = IsModalProps | NoModalProps;

type IsFormProps = {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
};
type NoFormProps = {
  form?: never;
  onSubmit?: never;
};
type FormProps = IsFormProps | NoFormProps;

type Props = CommonProps & ModalProps & FormProps;

export function Entity(props: Props) {
  const {
    children,
    form,
    modalButtonContent,
    modalDescription,
    modalQuery,
    modalTitle,
    onSubmit,
  } = props;

  return (
    <ModalEntity
      modalButtonContent={modalButtonContent}
      description={modalDescription}
      query={modalQuery}
      title={modalTitle}
    >
      <FormEntity form={form} onSubmit={onSubmit}>
        {children}
      </FormEntity>
    </ModalEntity>
  );
}
