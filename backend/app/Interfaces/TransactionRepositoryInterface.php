<?php

namespace App\Interfaces;

interface TransactionRepositoryInterface extends BaseRepositoryInterface
{
    public function getStudentTransactions(string $studentId);
}
