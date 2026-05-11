<?php

namespace App\Services;

use App\Interfaces\SubjectRepositoryInterface;

class AcademicService extends BaseService
{
    public function __construct(SubjectRepositoryInterface $repository)
    {
        parent::__construct($repository);
    }

    public function getSubjects()
    {
        return $this->repository->all();
    }

    public function recordGrade(array $data)
    {
        return \App\Models\AcademicGrade::create($data);
    }

    public function getStudentReport(string $studentId)
    {
        return \App\Models\AcademicGrade::with('subject')
            ->where('student_id', $studentId)
            ->get()
            ->groupBy('term');
    }
}
