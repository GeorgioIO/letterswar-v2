import api from "./axios";

export async function getAllStatsRequest(signal) {
  const response = await api.get("/stats", { signal });
  return response.data;
}
