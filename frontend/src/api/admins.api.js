import api from "./axios";

// TODO Get all admins
export async function getAllAdminsRequest() {
  const response = await api.get("/admins");
  return response.data;
}

// TODO Create admin
export async function createAdminRequest(data) {
  const response = await api.post("/admins", data);
  return response.data;
}

// TODO Update admin
export async function updateAdminRequest(id, data) {
  const response = await api.put(`/admins/${id}`, data);
  return response.data;
}

// TODO Delete admin
export async function deleteAdminRequest(id) {
  const response = await api.delete(`/admins/${id}`);
  return response.data;
}
