<?php

namespace App\Repositories;

use App\Interfaces\TahfizRepositoryInterface;
use App\Models\TahfizRecord;

class TahfizRepository extends BaseRepository implements TahfizRepositoryInterface
{
    public function __construct(TahfizRecord $model)
    {
        parent::__construct($model);
    }

    public function getStudentProgress(string $studentId)
    {
        return $this->model->where('student_id', $studentId)
            ->orderBy('created_at', 'desc')
            ->get();
    }
}
