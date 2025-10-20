<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateContenuCoursRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {

        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'contenu_pdf_base64' => 'required|string',
            'classe_id' => 'required|exists:classes,id',
            'class_type_course_id' => 'required|exists:class_type_courses,id',
            'teacher_id' => 'required|exists:teachers,id',
        ];
    }
}