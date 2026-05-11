<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['name', 'slug', 'description', 'type', 'address', 'phone', 'email', 'is_active'])]
class Institution extends Model
{
    use HasUuids, SoftDeletes;

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
