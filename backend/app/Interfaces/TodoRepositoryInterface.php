<?php

namespace App\Interfaces;

interface TodoRepositoryInterface extends BaseRepositoryInterface
{
    public function getTodosByUserId(int $userId);
}
