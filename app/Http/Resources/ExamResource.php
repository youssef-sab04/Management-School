<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExamResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'teacher_id' => $this->teacher_id,
            'teacher' => $this->whenLoaded('teacher', function () {
                return [
                    'id' => $this->teacher?->id,
                    'name' => $this->teacher?->firstname ?? null,
                        'l'=> $this->teacher?->lastname ?? null,

                ];
            }),
            'classe_id' => $this->classe_id,
            'classe' => $this->whenLoaded('classe', function () {
                return [
                    'id' => $this->classe?->id,
                    'name' => $this->classe?->name ?? null,
                    
                ];
            }),
            'class_type_course_id' => $this->class_type_course_id,
            'class_type_course' => $this->whenLoaded('classTypeCourse', function () {
                return [
                    'id' => $this->classTypeCourse?->id,
                    'name' => $this->classTypeCourse?->name ?? null,
                ];
            }),
            'type' => $this->type,
            'type_label' => $this->type_label ?? ($this->type === 'cc' ? 'Contrôle Continu' : 'Examen Final'),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'deleted_at' => $this->deleted_at,
        ];
    }
}
