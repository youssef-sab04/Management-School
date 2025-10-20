<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Courses extends Model
{
    //
    use SoftDeletes;
    protected $fillable = [
        'name',
        'description',
    ];

    protected $hidden = [
        'deleted_at',
        'created_at',
    ];
}
