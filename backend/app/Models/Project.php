<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'short_desc',
        'content',
        'construction_type',
        'sector',
        'location',
        'image',
        'status',
    ];

    use SoftDeletes;
}
