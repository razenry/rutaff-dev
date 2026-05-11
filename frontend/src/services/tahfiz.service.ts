import api from "@/lib/axios";

export const tahfizService = {
  getProgress: async (studentId?: string) => {
    const response = await api.get("/tahfiz", {
      params: { student_id: studentId },
    });
    return response.data.data;
  },
  recordProgress: async (data: {
    student_id: string;
    surah: string;
    ayah_start?: number;
    ayah_end?: number;
    type: "hafalan" | "murojaah";
    grade?: string;
    notes?: string;
  }) => {
    const response = await api.post("/tahfiz", data);
    return response.data.data;
  },
};
