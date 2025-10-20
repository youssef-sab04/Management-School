<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;



class ClassType extends Model
{
    //
    use SoftDeletes, HasFactory;

    protected $fillable = [
        'name',
        'code',
    ];

    protected $hidden = [
        'deleted_at',
        'created_at',
    ];
}
