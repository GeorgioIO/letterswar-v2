import api from "./axios";

export async function loginRequest(data) {
  const response = await api.post("/auth/login", data);

  return response.data;
}

export async function logoutRequest() {
  const response = await api.post("/auth/logout");

  return response.data;
}

export async function getMeRequest() {
  const response = await api.get("/auth/me");
  return response.data;
}
