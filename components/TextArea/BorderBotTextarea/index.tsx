import { ChangeEventHandler } from "react";

export interface BorderBotTextAreaProps {
  placeholder?: string;
  onChange?: ChangeEventHandler;
  value?: string;
}

export default function BorderBotTextArea({
  onChange,
  value,
  placeholder,
}: Readonly<BorderBotTextAreaProps>) {
  return (
    <div className="flex flex-col">
      {placeholder && <span className="font-bold">{placeholder}:</span>}
      <textarea
        onChange={onChange}
        value={value}
        className="outline-none bg-inherit border-b border-b-blue-500"
        placeholder={placeholder}
      />
    </div>
  );
}
