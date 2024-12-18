const apiConfig = {
  baseURL: process.env.NEXT_PUBLIC_URL,
  endpoint: {
    getQuestions: "/questions",
  },
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};
export default apiConfig;
