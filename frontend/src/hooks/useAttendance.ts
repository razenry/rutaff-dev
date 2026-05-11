import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { attendanceService } from "@/services/attendance.service";

export const useAttendance = () => {
  const queryClient = useQueryClient();

  const todayQuery = useQuery({
    queryKey: ["attendance", "today"],
    queryFn: attendanceService.getToday,
  });

  const historyQuery = useQuery({
    queryKey: ["attendance", "history"],
    queryFn: attendanceService.getHistory,
  });

  const clockInMutation = useMutation({
    mutationFn: attendanceService.clockIn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attendance"] });
    },
  });

  return {
    today: todayQuery.data,
    isLoadingToday: todayQuery.isLoading,
    history: historyQuery.data,
    isLoadingHistory: historyQuery.isLoading,
    clockIn: clockInMutation.mutate,
    isClockingIn: clockInMutation.isPending,
    error: clockInMutation.error,
  };
};
