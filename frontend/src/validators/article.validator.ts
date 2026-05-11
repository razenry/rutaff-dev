import { z } from 'zod';

export const articleSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters').max(255),
    content: z.string().min(10, 'Content must be at least 10 characters'),
    is_published: z.boolean().default(false),
});

export type ArticleFormValues = z.infer<typeof articleSchema>;

export interface Article {
    id: number;
    title: string;
    content: string;
    is_published: boolean;
    created_at: string;
    updated_at: string;
}
