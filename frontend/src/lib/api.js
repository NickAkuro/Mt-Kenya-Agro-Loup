import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const client = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Agro endpoints
export const getAgroEntries = async (userId) => {
  const response = await client.get("/api/agro", { params: userId ? { userId } : {} });
  return response.data;
};

export const createAgroEntry = async (payload) => {
  const res = await client.post("/api/agro/add", payload);
  return res.data;
};

export const updateAgroEntry = async (id, payload) => {
  const res = await client.put(`/api/agro/update/${id}`, payload);
  return res.data;
};

export const deleteAgroEntry = async (id) => {
  const res = await client.delete(`/api/agro/delete/${id}`);
  return res.data;
};

// Legacy export for backwards compatibility
export const AgroAPI = {
  list: getAgroEntries,
  create: createAgroEntry,
  update: updateAgroEntry,
  delete: deleteAgroEntry,
};