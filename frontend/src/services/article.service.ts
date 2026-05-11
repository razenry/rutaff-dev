import api from '@/lib/axios';
import { Article, ArticleFormValues } from '@/validators/article.validator';

export const articleService = {
    getAll: async (): Promise<Article[]> => {
        const response = await api.get('/articles');
        return response.data.data.data; // Laravel pagination wrapper
    },

    getById: async (id: number): Promise<Article> => {
        const response = await api.get(`/articles/${id}`);
        return response.data.data;
    },

    create: async (data: ArticleFormValues): Promise<Article> => {
        const response = await api.post('/articles', data);
        return response.data.data;
    },

    update: async (id: number, data: ArticleFormValues): Promise<Article> => {
        const response = await api.put(`/articles/${id}`, data);
        return response.data.data;
    },

    delete: async (id: number): Promise<void> => {
        await api.delete(`/articles/${id}`);
    },
};
