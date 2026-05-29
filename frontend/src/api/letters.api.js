import api from "./axios";

// TODO Get letters
export default async function getAllLettersRequest(signal) {
  const response = await api.get("/letters", { signal });
  return response.data;
}
