<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateExamRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'sometimes|required|string|max:255',
            'teacher_id' => 'sometimes|required|exists:teachers,id',
            'classe_id' => 'sometimes|required|exists:classes,id',
            'class_type_course_id' => 'sometimes|required|exists:class_type_courses,id',
            'type' => ['sometimes','required', Rule::in(['cc','efm'])],
        ];
    }
}
