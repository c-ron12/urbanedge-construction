<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Testimonial extends Model
{
    protected $fillable = [
        'testimonial',
        'citation',
        'image',
        'status',
    ];

    use SoftDeletes;
}
