import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { articleService } from '@/services/article.service';
import { ArticleFormValues } from '@/validators/article.validator';

export const useArticles = () => {
    return useQuery({
        queryKey: ['articles'],
        queryFn: articleService.getAll,
    });
};

export const useCreateArticle = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: ArticleFormValues) => articleService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['articles'] });
        },
    });
};
