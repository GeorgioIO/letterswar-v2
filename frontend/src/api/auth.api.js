import api from "./axios";

export async function loginRequest(data) {
  const response = await api.post("/auth/login", data);

  return response.data;
}
