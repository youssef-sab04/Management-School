<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class ClassTypeCourse extends Model
{
    //
    protected $fillable = [
        'courses_id',
        'classe_id',
        'coef',
    ];

    protected $hidden = [
        'deleted_at',
        'created_at',
    ];
     public function course()
    {
        return $this->belongsTo(Courses::class, 'courses_id');
    }

    /**
     * Relation avec le modèle Classe
     */
    public function classe()
    {
        return $this->belongsTo(Classe::class, 'classe_id');
    }
}
