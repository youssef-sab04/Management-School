<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DeclarationRessource extends JsonResource
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
            'exams_record_id' => $this->exams_record_id,
            'exam_id' => $this->exam_id,
            'user_id' => $this->user_id,
            'teacher_id' => $this->teacher_id,
            'classe_id' => $this->classe_id,
            'status' => $this->status,

            'Declaration' => $this->Declaration,
            'teacher' => $this->whenLoaded('teacher', function () {
                return [
                    'id' => $this->teacher?->id,
                    'name' => $this->teacher?->firstname ?? null,
                    'l' => $this->teacher?->lastname ?? null,
                ];
            }),
            'classe' => $this->whenLoaded('classe', function () {
                return [
                    'id' => $this->classe?->id,
                    'name' => $this->classe?->name ?? null,
                ];
            }),
            'exam' => $this->whenLoaded('exam', function () {
                return [
                    'id' => $this->exam?->id,
                    'name' => $this->exam?->name ?? null,
                ];
            }),
            'user' => $this->whenLoaded('user', function () {
                return [
                    'id' => $this->user?->id,
                    'name' => $this->user?->name ?? null,
                ];
            }),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
