<?php

namespace App\Services;

use App\Interfaces\TahfizRepositoryInterface;

class TahfizService extends BaseService
{
    public function __construct(TahfizRepositoryInterface $repository)
    {
        parent::__construct($repository);
    }

    public function recordProgress(array $data)
    {
        return $this->repository->create($data);
    }

    public function getStudentProgress(string $studentId)
    {
        return $this->repository->getStudentProgress($studentId);
    }
}
