"use client";

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { useTodos, useCreateTodo, useUpdateTodo, useDeleteTodo } from '@/hooks/useTodos';

export default function TodoPage() {
  const [newTodo, setNewTodo] = useState('');
  const { user, isAuthenticated, clearAuth } = useAuthStore();
  const router = useRouter();

  const { data: todos, isLoading } = useTodos();
  const createTodoMutation = useCreateTodo();
  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    createTodoMutation.mutate(newTodo, {
      onSuccess: () => setNewTodo(''),
    });
  };

  const handleLogout = () => {
    clearAuth();
    router.push('/login');
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">My Todos</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Hello, {user?.name}</span>
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-red-600 hover:text-red-800"
            >
              Logout
            </button>
          </div>
        </div>

        <form onSubmit={handleAddTodo} className="mb-8 flex gap-2">
          <input
            type="text"
            className="flex-1 rounded-lg border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500 text-black"
            placeholder="What needs to be done?"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button
            type="submit"
            disabled={createTodoMutation.isPending}
            className="rounded-lg bg-indigo-600 px-6 py-2 font-medium text-white hover:bg-indigo-700 disabled:bg-indigo-400"
          >
            Add
          </button>
        </form>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-3">
            {todos?.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={todo.is_completed}
                    onChange={(e) =>
                      updateTodoMutation.mutate({
                        id: todo.id,
                        data: { is_completed: e.target.checked },
                      })
                    }
                    className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span
                    className={
                      todo.is_completed ? 'text-gray-400 line-through' : 'text-gray-900'
                    }
                  >
                    {todo.title}
                  </span>
                </div>
                <button
                  onClick={() => deleteTodoMutation.mutate(todo.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
