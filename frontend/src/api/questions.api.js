import api from "./axios";

// TODO Get questions
export async function getAllQuestionsRequest(
  page = 1,
  limit = 10,
  letter = null,
) {
  const params = { page, limit };

  if (letter) params.letter = letter;

  const response = await api.get(`/questions`, { params });
  return response.data;
}

// TODO Get question
export async function getQuestionByIdRequest(id) {
  const response = await api.get(`/questions/${id}`);
  return response.data;
}

// TODO Create question
export async function createQuestionRequest(data) {
  const response = await api.post("/questions", data);
  return response.data;
}

// TODO Update question
export async function updateQuestionRequest(id, data) {
  console.log("id in function: ", id);
  const response = await api.put(`/questions/${id}`, data);
  return response.data;
}

// TODO Delete question
export async function deleteQuestionRequest(id) {
  const response = await api.delete(`/questions/${id}`);
  return response.data;
}
