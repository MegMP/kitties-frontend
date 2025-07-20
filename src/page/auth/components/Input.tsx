type Input = {
  attribute: string;
  placeholder: string;
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = ({ attribute, value, placeholder, onChange }: Input) => {
  let type: string = "text";

  switch (attribute) {
    case "password":
      type = "password";
      break;
    case "email":
      type = "email";
      break;
    default:
      type = "text";
      break;
  }

  return (
    <>
      <input
        type={type}
        name={attribute}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required
      />
      <br />
    </>
  );
};
