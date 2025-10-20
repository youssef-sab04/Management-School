<?php

namespace App\Http\Resources;

use App\Models\ClassTypeCourse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClassTypeCourseRessourcess extends JsonResource
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
            'courses_id' => $this->courses_id,
            'classe_id' => $this->classe_id,
            'coef' => $this->coef,
            'course' => $this->whenLoaded('course', function () {
                return [
                    'id' => $this->course->id,
                    'name' => $this->course->name,
                    'description' => $this->course->description,
                ];
            }),
            'classe' => $this->whenLoaded('classe', function () {
                return [
                    'id' => $this->classe->id,
                    'name' => $this->classe->name,
                    'code' => $this->classe->code,
                ];
            }),
            'updated_at' => $this->updated_at,
        ];
    }
}
