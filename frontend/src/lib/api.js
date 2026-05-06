import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Endpoints por vista
export const inicioAPI = {
  getData: () => api.get("/inicio"),
};

export const catalogoAPI = {
  getData: () => api.get("/catalogo"),
};

export const manifiestoAPI = {
  getData: () => api.get("/manifiesto"),
};

export const encargoAPI = {
  getData: () => api.get("/encargo"),
};

// Hook para fetch con loading y error
export const fetchPageData = async (apiMethod) => {
  try {
    const response = await apiMethod();
    return { data: response.data, error: null, loading: false };
  } catch (err) {
    console.error("API Error:", err);
    return { data: null, error: err.message, loading: false };
  }
};

export default api;
