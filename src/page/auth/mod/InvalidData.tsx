type Message = {
  message: string;
};

export const InvalidData = ({ message }: Message) => {
  return (
    <div>
      <p>{message}</p>
    </div>
  );
};
