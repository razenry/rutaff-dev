<?php

namespace App\Repositories;

use App\Interfaces\TransactionRepositoryInterface;
use App\Models\Transaction;

class TransactionRepository extends BaseRepository implements TransactionRepositoryInterface
{
    public function __construct(Transaction $model)
    {
        parent::__construct($model);
    }

    public function getStudentTransactions(string $studentId)
    {
        return $this->model->where('user_id', $studentId)
            ->orderBy('created_at', 'desc')
            ->get();
    }
}
