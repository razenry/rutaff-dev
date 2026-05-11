<?php

namespace App\Repositories;

use App\Interfaces\SubjectRepositoryInterface;
use App\Models\Subject;

class SubjectRepository extends BaseRepository implements SubjectRepositoryInterface
{
    public function __construct(Subject $model)
    {
        parent::__construct($model);
    }
}
