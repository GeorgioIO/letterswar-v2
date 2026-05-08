import api from "./axios";

export async function getAllStatsRequest() {
  const response = await api.get("/stats");
  return response.data;
}
