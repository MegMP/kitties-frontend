export type AccountAttribute = "firstname" | "lastname" | "email" |"username" | "password" | "city";

export type AccountFormProps = {
  userId: number;
  handleChangeValue: (value: string, attribute: AccountAttribute) => void;
  type: AccountAttribute;
  placeholder?: string;
  required?: boolean;
};

export type FormData = {
  value: string;
};
