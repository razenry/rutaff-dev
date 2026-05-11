<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TahfizTarget extends Model
{
    use HasUuids, SoftDeletes;

    protected $fillable = [
        'student_id',
        'target_surah',
        'target_juz',
        'deadline',
        'is_completed',
    ];

    public function student(): BelongsTo
    {
        return $this->belongsTo(User::class, 'student_id');
    }
}
