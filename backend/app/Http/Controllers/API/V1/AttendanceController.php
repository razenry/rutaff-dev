<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Services\AttendanceService;
use App\Traits\ApiResponser;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class AttendanceController extends Controller
{
    use ApiResponser;

    protected AttendanceService $attendanceService;

    public function __construct(AttendanceService $attendanceService)
    {
        $this->attendanceService = $attendanceService;
    }

    public function index(Request $request): JsonResponse
    {
        $attendances = $this->attendanceService->paginate();
        return $this->successResponse($attendances, 'Attendances retrieved');
    }

    public function today(Request $request): JsonResponse
    {
        $attendance = $this->attendanceService->getTodayAttendance($request->user()->id);
        return $this->successResponse($attendance, 'Today\'s attendance status');
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'status' => 'required|in:present,sick,leave,absent',
            'gps_lat' => 'nullable|numeric',
            'gps_long' => 'nullable|numeric',
            'selfie' => 'nullable|image|max:2048',
            'notes' => 'nullable|string',
        ]);

        try {
            $data = $request->all();
            $data['user_id'] = $request->user()->id;
            
            $attendance = $this->attendanceService->markAttendance($data);
            
            return $this->successResponse($attendance, 'Attendance marked successfully', 201);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage());
        }
    }
}
