import { ChangeEventHandler } from "react";

export interface BorderBotInputProps {
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
}

export default function BorderBotInput({
  onChange,
  value,
  placeholder,
}: Readonly<BorderBotInputProps>) {
  return (
    <div className="flex flex-col w-full">
      {placeholder && <span>{placeholder}:</span>}
      <input
        value={value}
        onChange={onChange}
        className="outline-none bg-inherit border-b border-b-blue-500"
        placeholder={placeholder}
      />
    </div>
  );
}
