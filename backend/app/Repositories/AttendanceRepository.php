<?php

namespace App\Repositories;

use App\Interfaces\AttendanceRepositoryInterface;
use App\Models\Attendance;

class AttendanceRepository extends BaseRepository implements AttendanceRepositoryInterface
{
    public function __construct(Attendance $model)
    {
        parent::__construct($model);
    }

    public function getTodayAttendance(string $userId)
    {
        return $this->model->where('user_id', $userId)
            ->whereDate('date', now())
            ->first();
    }
}
