<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Services\AcademicService;
use App\Traits\ApiResponser;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class AcademicController extends Controller
{
    use ApiResponser;

    protected AcademicService $academicService;

    public function __construct(AcademicService $academicService)
    {
        $this->academicService = $academicService;
    }

    public function subjects(): JsonResponse
    {
        $subjects = $this->academicService->getSubjects();
        return $this->successResponse($subjects, 'Subjects retrieved');
    }

    public function recordGrade(Request $request): JsonResponse
    {
        $request->validate([
            'student_id' => 'required|exists:users,id',
            'subject_id' => 'required|exists:subjects,id',
            'type' => 'required|in:formative,summative',
            'score' => 'required|integer|min:0|max:100',
            'term' => 'required|string',
            'notes' => 'nullable|string',
        ]);

        try {
            $data = $request->all();
            $data['teacher_id'] = $request->user()->id;
            
            $grade = $this->academicService->recordGrade($data);
            
            return $this->successResponse($grade, 'Grade recorded successfully', 201);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage());
        }
    }

    public function report(Request $request): JsonResponse
    {
        $studentId = $request->query('student_id', $request->user()->id);
        $report = $this->academicService->getStudentReport($studentId);
        return $this->successResponse($report, 'Academic report retrieved');
    }
}
