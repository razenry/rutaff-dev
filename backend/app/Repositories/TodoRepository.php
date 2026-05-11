<?php

namespace App\Repositories;

use App\Interfaces\TodoRepositoryInterface;
use App\Models\Todo;

class TodoRepository extends BaseRepository implements TodoRepositoryInterface
{
    public function __construct(Todo $model)
    {
        parent::__construct($model);
    }

    public function getTodosByUserId(int $userId)
    {
        return $this->model->where('user_id', $userId)->orderBy('created_at', 'desc')->get();
    }
}
