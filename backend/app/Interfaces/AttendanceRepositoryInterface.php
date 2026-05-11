<?php

namespace App\Interfaces;

interface AttendanceRepositoryInterface extends BaseRepositoryInterface
{
    public function getTodayAttendance(string $userId);
}
