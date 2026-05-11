<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TahfizRecord extends Model
{
    use HasUuids, SoftDeletes;

    protected $fillable = [
        'student_id',
        'musyrif_id',
        'surah',
        'ayah_start',
        'ayah_end',
        'type',
        'grade',
        'notes',
    ];

    public function student(): BelongsTo
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    public function musyrif(): BelongsTo
    {
        return $this->belongsTo(User::class, 'musyrif_id');
    }
}
