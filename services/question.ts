import apiConfig from "@/config/apiConfig";
import { get, post } from "@/utils/api";

export async function getQuestions() {
  const data = await get(apiConfig.endpoint.getQuestions);
  return data.data;
}

type AddQuestion = {
  text: string;
  answers: { text: string; isTrue: boolean }[];
  choose?: number;
  explain: string;
};

export async function addQuestions(data: AddQuestion) {
  const res = await post(apiConfig.endpoint.getQuestions, data);
  return res.data;
}
