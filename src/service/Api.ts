import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getBalance = async () => {
  try {
    const response = await api.get("/balance");
    return response.data.data; // Retorna solo los datos relevantes
  } catch (error) {
    console.error("Error al obtener el balance:", error);
    return [];
  }
};

// Función para obtener las categorías
export const getCategories = async () => {
  try {
    const response = await api.get("/category");
    return response.data;
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    return [];
  }
};

export const getTransactions = async () => {
  try {
    const response = await api.get("/transaction");
    return response.data;
  } catch (error) {
    console.error("Error al obtener transacciones:", error);
    return [];
  }
};

export const createTransaction = async (data: {
  description: string;
  amount: number;
  category_id: number | null;
  type: string;
}) => {
  try {
    const response = await api.post("/transaction", data);
    return response;
  } catch (error: any) {
    console.error("Error al crear transacción:", error);
    return error.response;
  }
};
