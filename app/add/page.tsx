"use client";

import BorderBotInput from "@/components/Input/BorderBotInput";
import BorderBotTextArea from "@/components/TextArea/BorderBotTextarea";
import { addQuestions } from "@/services/question";
import { TrashIcon } from "@heroicons/react/24/outline";
import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  MouseEvent,
  useState,
} from "react";

const defaultAnswers = [
  { text: "", isTrue: false },
  { text: "", isTrue: false },
  { text: "", isTrue: false },
  { text: "", isTrue: false },
];

const INDEX_OFFSET = 2;

export default function AddPage() {
  const [answers, setAnswers] =
    useState<{ text: string; isTrue: boolean }[]>(defaultAnswers);

  const [question, setQuestion] = useState("");
  const [explain, setExplain] = useState("");

  const handleAddAnswer = (e: MouseEvent) => {
    e.preventDefault();
    setAnswers([...answers, { text: "", isTrue: true }]);
  };

  const removeAnswerAt = (p: number) => {
    console.log(p);
    setAnswers([...answers.slice(0, p), ...answers.slice(p + 1)]);
  };

  const handleChangeCheckbox = (p: number, value: boolean) => {
    setAnswers([
      ...answers.slice(0, p),
      { ...answers[p], isTrue: value },
      ...answers.slice(p + 1),
    ]);
  };

  const handleTextChange = (p: number, value: string) => {
    setAnswers([
      ...answers.slice(0, p),
      { ...answers[p], text: value },
      ...answers.slice(p + 1),
    ]);
  };

  const handleQuestionChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setQuestion(e.target.value);
  };

  const handleExplainChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setExplain(e.target.value);
  };

  const resetDefault = () => {
    setQuestion("");
    setExplain("");
    setAnswers(defaultAnswers);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await addQuestions({ answers: answers, text: question, explain: explain });
    window.alert("added");

    resetDefault();
  };

  const inputEvent = async (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.code === "Enter") {
      e.preventDefault();
      const element = e.target as HTMLElement;
      console.log(element);
      const index = element.getAttribute("data-index");
      if (index) {
        if (+index == answers.length + INDEX_OFFSET - 1) {
          handleSubmit(e);
        } else
          (
            (e.currentTarget.querySelector(
              `[data-index="${+index + 1}"]`
            ) as HTMLInputElement) || HTMLTextAreaElement
          ).focus();
      }
    }
    if (e.code === "Tab") {
      e.preventDefault();
      if (!(e.target instanceof HTMLInputElement)) {
        return;
      }
      const element = e.target as HTMLElement;
      console.log(element);
      const index = element.getAttribute("data-index");
      if (index) {
        (
          (e.currentTarget.querySelector(
            `#check-${String(+index - INDEX_OFFSET)}`
          ) as HTMLInputElement) || HTMLTextAreaElement
        ).click();
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-slate-200">
      <div className="w-full bg-blue-200 p-2 ">Header</div>
      <div className="w-1/2">
        <div className="font-bold"></div>
        <form
          className="flex flex-col"
          onSubmit={handleSubmit}
          onKeyDown={inputEvent}
        >
          <BorderBotTextArea
            dataIndex={0}
            onChange={handleQuestionChange}
            value={question}
            placeholder="Question"
          />
          <div>
            <BorderBotTextArea
              dataIndex={1}
              onChange={handleExplainChange}
              value={explain}
              placeholder="Explain"
            />
          </div>
          <div>
            <span className="font-bold">Answers:</span>
            <button
              onClick={handleAddAnswer}
              className="border rounded p-1 w-8 h-8 border-blue-300 hover:bg-blue-200"
            >
              +
            </button>
          </div>
          <div>
            {answers.map((ans, i) => (
              <div className="flex flex-row w-full gap-2" key={i}>
                <input
                  id={"check-" + String(i)}
                  type="checkbox"
                  checked={ans.isTrue}
                  onChange={(e) => {
                    handleChangeCheckbox(i, e.target.checked);
                  }}
                />
                <BorderBotInput
                  dataIndex={i + INDEX_OFFSET}
                  value={ans.text}
                  onChange={(e) => {
                    handleTextChange(i, e.target.value);
                  }}
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    removeAnswerAt(i);
                  }}
                  className="hover:bg-blue-300 p-2 border rounded-full border-blue-200"
                >
                  <TrashIcon width={16} height={16} />
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-center w-full">
            <button
              className="hover:bg-blue-300 p-2 border rounded border-blue-200"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="bg-slate-300 border-t w-full border-t-black p-2 mt-4">
        Footer
      </div>
    </div>
  );
}
