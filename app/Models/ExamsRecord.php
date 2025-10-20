<?php

namespace App\Models;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;



use Illuminate\Database\Eloquent\Model;

class ExamsRecord extends Model
{
    use SoftDeletes;

    //
     protected $fillable = [
        'exam_id',
        'user_id',
        'note',
        'comment',
    ];

    protected $hidden = [
        'deleted_at',
        'created_at',
    ];

    public function exam(): BelongsTo
    {
        return $this->belongsTo(Exam::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
