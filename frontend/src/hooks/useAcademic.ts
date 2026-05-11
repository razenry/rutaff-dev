import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { academicService } from "@/services/academic.service";

export const useAcademic = () => {
  const queryClient = useQueryClient();

  const subjectsQuery = useQuery({
    queryKey: ["academic", "subjects"],
    queryFn: academicService.getSubjects,
  });

  const classesQuery = useQuery({
    queryKey: ["academic", "classes"],
    queryFn: academicService.getClasses,
  });

  const createSubjectMutation = useMutation({
    mutationFn: academicService.createSubject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["academic", "subjects"] });
    },
  });

  const createClassMutation = useMutation({
    mutationFn: academicService.createClass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["academic", "classes"] });
    },
  });

  return {
    subjects: subjectsQuery.data,
    isLoadingSubjects: subjectsQuery.isLoading,
    classes: classesQuery.data,
    isLoadingClasses: classesQuery.isLoading,
    createSubject: createSubjectMutation.mutate,
    isCreatingSubject: createSubjectMutation.isPending,
    createClass: createClassMutation.mutate,
    isCreatingClass: createClassMutation.isPending,
  };
};
