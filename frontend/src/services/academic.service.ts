import api from "@/lib/axios";

export const academicService = {
  getSubjects: async () => {
    const response = await api.get("/subjects");
    return response.data.data;
  },
  getClasses: async () => {
    const response = await api.get("/classes");
    return response.data.data;
  },
  createSubject: async (data: { name: string; code?: string; description?: string }) => {
    const response = await api.post("/subjects", data);
    return response.data.data;
  },
  createClass: async (data: { name: string; level?: string; academic_year?: string }) => {
    const response = await api.post("/classes", data);
    return response.data.data;
  },
};
