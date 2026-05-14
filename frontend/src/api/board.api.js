import api from "./axios";

export async function generateBoardRequest() {
  const response = await api.get("/board/generate");
  return response.data;
}
