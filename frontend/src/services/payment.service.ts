import api from "@/lib/axios";

export const paymentService = {
  getWallet: async () => {
    const response = await api.get("/wallet");
    return response.data.data;
  },
  getTransactions: async () => {
    const response = await api.get("/transactions");
    return response.data.data;
  },
  createPayment: async (data: { amount: number; type: string }) => {
    const response = await api.post("/transactions", data);
    return response.data.data;
  },
};
