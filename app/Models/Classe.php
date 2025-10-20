<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Classe extends Model
{
    //
    protected $fillable = [
        'name',
        'code',
        'class_type_id',
    ];

    protected $hidden = [
        'deleted_at',
        'created_at',
    ];
    
}
