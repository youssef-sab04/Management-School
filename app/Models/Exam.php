<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Exam extends Model
{
    //
protected $fillable = [
        'name',
        'teacher_id',
        'classe_id',
        'class_type_course_id',
        'type',
    ];

    protected $dates = ['deleted_at'];

    /**
     * Relations
     */
    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }

    public function classe()
    {
        return $this->belongsTo(Classe::class);
    }

    public function classTypeCourse()
    {
        return $this->belongsTo(ClassTypeCourse::class, 'class_type_course_id');
    }

    /**
     * Accessor : retourne un label lisible pour le type d'examen
     */
    public function getTypeLabelAttribute()
    {
        return $this->type === 'cc' ? 'Contrôle Continu' : 'Examen Final';
    }

    protected $appends = ['type_label'];
}
