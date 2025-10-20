<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreExamRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'teacher_id' => 'required|exists:teachers,id',
            'classe_id' => 'required|exists:classes,id',
            'class_type_course_id' => 'required|exists:class_type_courses,id',
            'type' => ['required', Rule::in(['cc','efm'])],
        ];
    }
}
