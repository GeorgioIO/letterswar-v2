import api from "./axios";

export async function getAllStatsRequest(signal) {
  const response = await api.get("/sts", { signal });
  return response.data;
}
