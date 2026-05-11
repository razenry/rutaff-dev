import api from '@/lib/axios';

export interface Todo {
  id: number;
  user_id: number;
  title: string;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
}

export const todoService = {
  getAll: async (): Promise<Todo[]> => {
    const response = await api.get('/todos');
    return response.data.data;
  },

  create: async (title: string): Promise<Todo> => {
    const response = await api.post('/todos', { title });
    return response.data.data;
  },

  update: async (id: number, data: Partial<Todo>): Promise<Todo> => {
    const response = await api.put(`/todos/${id}`, data);
    return response.data.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/todos/${id}`);
  },
};
