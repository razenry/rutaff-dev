<?php

namespace App\Interfaces;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

interface BaseRepositoryInterface
{
    public function all(): Collection;

    public function find(string $id): ?Model;

    public function create(array $data): Model;

    public function update(string $id, array $data): bool;

    public function delete(string $id): bool;

    public function paginate(int $perPage = 15): LengthAwarePaginator;
}
