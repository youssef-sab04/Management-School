<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExamsRecordResources extends JsonResource
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
            'exam_id' => $this->exam_id,
            'user_id' => $this->user_id,
            'note' => $this->note,
            'comment' => $this->comment,
            'exam' => $this->whenLoaded('exam', function () {
                return [
                    'id' => $this->exam->id,
                    'name' => $this->exam->name,
                    'type' => $this->exam->type,
                ];
            }),
            'user' => $this->whenLoaded('user', function () {
                return [
                    'id' => $this->user->id,
                    'firstname' => $this->user->firstname,
                    'lastname' => $this->user->lastname,
                    'email' => $this->user->email,
                ];
            }),
            'updated_at' => $this->updated_at,
        ];
    }
}