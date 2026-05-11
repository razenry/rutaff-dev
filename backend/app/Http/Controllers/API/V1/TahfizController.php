<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Services\TahfizService;
use App\Traits\ApiResponser;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TahfizController extends Controller
{
    use ApiResponser;

    protected TahfizService $tahfizService;

    public function __construct(TahfizService $tahfizService)
    {
        $this->tahfizService = $tahfizService;
    }

    public function index(Request $request): JsonResponse
    {
        $records = $this->tahfizService->getStudentProgress($request->user()->id);
        return $this->successResponse($records, 'Tahfiz records retrieved');
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'student_id' => 'required|exists:users,id',
            'surah' => 'required|string',
            'ayah_start' => 'nullable|integer',
            'ayah_end' => 'nullable|integer',
            'type' => 'required|in:hafalan,murojaah',
            'grade' => 'nullable|in:A,B,C,D',
            'notes' => 'nullable|string',
        ]);

        try {
            $data = $request->all();
            $data['musyrif_id'] = $request->user()->id;
            
            $record = $this->tahfizService->recordProgress($data);
            
            return $this->successResponse($record, 'Tahfiz record created successfully', 201);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage());
        }
    }
}
