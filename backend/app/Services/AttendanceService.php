<?php

namespace App\Services;

use App\Interfaces\AttendanceRepositoryInterface;
use Illuminate\Support\Facades\Storage;

class AttendanceService extends BaseService
{
    protected NotificationService $notificationService;

    public function __construct(
        AttendanceRepositoryInterface $repository,
        NotificationService $notificationService
    ) {
        parent::__construct($repository);
        $this->notificationService = $notificationService;
    }

    public function markAttendance(array $data)
    {
        $existing = $this->repository->getTodayAttendance($data['user_id']);
        
        if ($existing) {
            throw new \Exception('You have already marked attendance for today.');
        }

        if (isset($data['selfie'])) {
            $path = $data['selfie']->store('attendances/selfies', 'public');
            $data['selfie_path'] = $path;
            unset($data['selfie']);
        }

        $data['date'] = now()->toDateString();

        $attendance = $this->repository->create($data);

        // Notify parents/musyrif
        $this->notificationService->sendPushNotification(
            $attendance->user_id,
            "Attendance Marked",
            "Your child has marked attendance as {$attendance->status}."
        );

        return $attendance;
    }

    public function getTodayAttendance(string $userId)
    {
        return $this->repository->getTodayAttendance($userId);
    }
}
