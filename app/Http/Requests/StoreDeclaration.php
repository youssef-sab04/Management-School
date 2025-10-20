<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDeclaration extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
       return [
    'exams_record_id' => 'required|exists:exams_records,id',
    'exam_id' => 'required|exists:exams,id',
    'classe_id' => 'required|exists:classes,id',
    'user_id' => 'required|exists:users,id',
    'teacher_id' => 'required|exists:teachers,id',
    'Declaration' => 'required|string|max:255',
    'status' => 'required|string|max:255',

];
    }
}
