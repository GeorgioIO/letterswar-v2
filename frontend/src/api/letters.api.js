import api from "./axios";

// TODO Get letters
export async function getAllLettersRequest() {
  const response = await api.get("/letters");
  return response.data;
}
