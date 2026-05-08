import api from "./axios";

// TODO Get questions
export async function getAllQuestionRequest() {
  const response = await api.get("/questions");
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
  const response = await api.put(`/questions/${id}`, data);
  return response.data;
}

// TODO Delete question
export async function deleteQuestionRequest(id) {
  const response = await api.delete(`/questions/${id}`);
  return response.data;
}
