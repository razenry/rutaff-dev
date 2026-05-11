import api from "@/lib/axios";

export const attendanceService = {
  getToday: async () => {
    const response = await api.get("/attendance/today");
    return response.data.data;
  },
  getHistory: async () => {
    const response = await api.get("/attendance");
    return response.data.data;
  },
  clockIn: async (data: { gps_lat: number; gps_long: number; selfie?: File; notes?: string }) => {
    const formData = new FormData();
    formData.append("gps_lat", data.gps_lat.toString());
    formData.append("gps_long", data.gps_long.toString());
    if (data.selfie) {
      formData.append("selfie", data.selfie);
    }
    if (data.notes) {
      formData.append("notes", data.notes);
    }

    const response = await api.post("/attendance", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.data;
  },
};
