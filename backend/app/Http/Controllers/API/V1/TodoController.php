<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Interfaces\TodoRepositoryInterface;
use App\Traits\ApiResponser;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    use ApiResponser;

    protected TodoRepositoryInterface $todoRepository;

    public function __construct(TodoRepositoryInterface $todoRepository)
    {
        $this->todoRepository = $todoRepository;
    }

    public function index(Request $request): JsonResponse
    {
        $todos = $this->todoRepository->getTodosByUserId($request->user()->id);
        return $this->successResponse($todos, 'Todos retrieved successfully');
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $todo = $this->todoRepository->create(array_merge($validated, [
            'user_id' => $request->user()->id,
            'is_completed' => false
        ]));

        return $this->successResponse($todo, 'Todo created successfully', 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $todo = $this->todoRepository->findById($id);

        if (!$todo || $todo->user_id !== $request->user()->id) {
            return $this->errorResponse('Todo not found', 404);
        }

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'is_completed' => 'sometimes|boolean',
        ]);

        $this->todoRepository->update($id, $validated);
        $updatedTodo = $this->todoRepository->findById($id);

        return $this->successResponse($updatedTodo, 'Todo updated successfully');
    }

    public function destroy(Request $request, int $id): JsonResponse
    {
        $todo = $this->todoRepository->findById($id);

        if (!$todo || $todo->user_id !== $request->user()->id) {
            return $this->errorResponse('Todo not found', 404);
        }

        $this->todoRepository->delete($id);

        return $this->successResponse(null, 'Todo deleted successfully');
    }
}
