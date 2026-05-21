<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Article extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'author',
        'content',
        'image',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'created_at' => 'datetime:d M, Y',
        ];
    }

    use SoftDeletes;
}
