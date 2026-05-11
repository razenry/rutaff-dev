<?php

namespace App\Interfaces;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

interface BaseRepositoryInterface
{
    public function all(array $columns = ['*'], array $relations = []): Collection;
    public function findById(int $id, array $columns = ['*'], array $relations = [], array $appends = []): ?Model;
    public function create(array $payload): ?Model;
    public function update(int $id, array $payload): bool;
    public function delete(int $id): bool;
    public function paginate(int $perPage = 15, array $columns = ['*'], array $relations = []);
}
