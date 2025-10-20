<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ContenuCours extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'contenu_pdf_base64',
        'classe_id',
        'class_type_course_id',
        'teacher_id',
    ];

    protected $hidden = [
        'contenu_pdf_base64',
        'created_at',
    ];

    public function classe(): BelongsTo
    {
        return $this->belongsTo(Classe::class);
    }

    public function classTypeCourse(): BelongsTo
    {
        return $this->belongsTo(ClassTypeCourse::class);
    }

    public function teacher(): BelongsTo
    {
        return $this->belongsTo(Teacher::class);
    }
}