<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Member extends Model
{
    protected $fillable = [
        'name',
        'designation',
        'image',
        'linkedin_url',
        'status',
    ];

    use SoftDeletes;
}
