import { ChangeEventHandler } from "react";

export interface BorderBotTextAreaProps {
  placeholder?: string;
  onChange?: ChangeEventHandler;
  value?: string;
  dataIndex?: number;
}

export default function BorderBotTextArea({
  onChange,
  value,
  placeholder,
  dataIndex,
}: Readonly<BorderBotTextAreaProps>) {
  return (
    <div className="flex flex-col">
      {placeholder && <span className="font-bold">{placeholder}:</span>}
      <textarea
        data-index={dataIndex}
        onChange={onChange}
        value={value}
        className="outline-none bg-inherit border-b border-b-blue-500"
        placeholder={placeholder}
      />
    </div>
  );
}
