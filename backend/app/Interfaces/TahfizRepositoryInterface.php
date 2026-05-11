<?php

namespace App\Interfaces;

interface TahfizRepositoryInterface extends BaseRepositoryInterface
{
    public function getStudentProgress(string $studentId);
}
