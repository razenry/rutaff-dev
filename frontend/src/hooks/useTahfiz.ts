import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { tahfizService } from "@/services/tahfiz.service";

export const useTahfiz = (studentId?: string) => {
  const queryClient = useQueryClient();

  const progressQuery = useQuery({
    queryKey: ["tahfiz", "progress", studentId],
    queryFn: () => tahfizService.getProgress(studentId),
  });

  const recordMutation = useMutation({
    mutationFn: tahfizService.recordProgress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tahfiz"] });
    },
  });

  return {
    progress: progressQuery.data,
    isLoading: progressQuery.isLoading,
    recordProgress: recordMutation.mutate,
    isRecording: recordMutation.isPending,
  };
};
