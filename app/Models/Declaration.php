<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Declaration extends Model
{
    //
    protected $fillable = [
        'exams_record_id',
        'exam_id', 
        'user_id',
        'teacher_id',
        'classe_id',
        'Declaration',
        'status' 

    ];
    public function teacher()
{
    return $this->belongsTo(Teacher::class);
}

public function classe() 
{
    return $this->belongsTo(Classe::class);
}

public function exam()
{
    return $this->belongsTo(Exam::class);
}

public function user()
{
    return $this->belongsTo(User::class);
}

public function examsRecord()
{
    return $this->belongsTo(ExamsRecord::class, 'exams_record_id');
}

}
