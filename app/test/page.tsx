"use client";

import { getQuestions } from "@/services/question";
import { FormEvent, useEffect, useState } from "react";

type Question = {
  text: string;
  explain: string;
  answers: { text: string; isTrue: boolean }[];
  choose?: number;
};

export default function EnglishTest() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [result, setResult] = useState({ show: false, score: 0, total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async function () {
      try {
        const response = await getQuestions();
        setQuestions(response);
      } catch (error) {
        console.log(error);
        // setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleChoose = (question: number, choose: number) => {
    setQuestions([
      ...questions.slice(0, question),
      { ...questions[question], choose: choose },
      ...questions.splice(question + 1),
    ]);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(questions);
    let score = 0;
    questions.forEach((q) => {
      if (q.choose != undefined && q.answers[q.choose].isTrue) {
        score++;
      }
    });
    setResult({ score: score, show: true, total: questions.length });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-1/2">
        <form onSubmit={handleSubmit}>
          {questions.map((question, i) => {
            return (
              <div className="flex flex-col" key={i}>
                <span className="font-bold">
                  {i + 1}. {question.text}
                </span>
                {question.answers.map((ans, j) => {
                  return (
                    <div key={j} className="flex flex-row gap-2">
                      <label className="flex flex-row gap-2">
                        <input
                          type="radio"
                          name={i + "ans"}
                          onChange={() => {
                            handleChoose(i, j);
                          }}
                        ></input>
                        {ans.text}
                      </label>
                    </div>
                  );
                })}
              </div>
            );
          })}
          <div>
            <button type="submit" className="bg-blue-100 hover:bg-blue-200 p-2">
              Submit
            </button>
          </div>
        </form>
        {result.show && (
          <div>
            <div>Result:</div>
            <div>
              total: {result.total} - correct: {result.score} -{" "}
              <b>score: {(result.score * 10) / result.total}</b>
            </div>
            {questions.map((q, i) => {
              const trueIndex = q.answers.findIndex((p) => p.isTrue);
              if (trueIndex >= 0 && trueIndex !== q.choose) {
                return (
                  <div key={i} className="text-red-500">
                    {i + 1}. <b>&quot;{q.answers[trueIndex].text}&quot;</b> -{" "}
                    {q.explain}
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
}
