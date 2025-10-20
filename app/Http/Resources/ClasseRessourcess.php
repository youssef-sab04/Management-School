<?php

namespace App\Http\Resources;

use App\Models\Classe;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClasseRessourcess extends JsonResource
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
            'id_class_type' => $this->class_type_id,
            'name' => $this->name,
            'code' => $this->code,
            'updated_at' => $this->updated_at,
        ];
    }
}
