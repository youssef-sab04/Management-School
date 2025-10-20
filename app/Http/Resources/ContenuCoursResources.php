<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ContenuCoursResources extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'classe_id' => $this->classe_id,
            'class_type_course_id' => $this->class_type_course_id,
                    'contenu_pdf_base64' => $this->contenu_pdf_base64, // ← AJOUTEZ CETTE LIGNE

            'teacher_id' => $this->teacher_id,
            'classe' => $this->whenLoaded('classe', function () {
                return [
                    'id' => $this->classe->id,
                    'name' => $this->classe->name,
                    'code' => $this->classe->code,
                ];
            }),
            'class_type_course' => $this->whenLoaded('classTypeCourse', function () {
                return [
                    'id' => $this->classTypeCourse->id,
                    'course_name' => $this->classTypeCourse->course->name ?? 'Course',
                ];
            }),
            'teacher' => $this->whenLoaded('teacher', function () {
                return [
                    'id' => $this->teacher?->id,
                    'name' => $this->teacher?->firstname ?? null,
                        'l'=> $this->teacher?->lastname ?? null,

                ];
            }),
            'updated_at' => $this->updated_at,
        ];
    }
}