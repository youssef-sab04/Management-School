<?php

namespace App\Http\Resources;

use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TeacherRessourcess extends JsonResource
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
            'firstname' => $this->firstname,
            'lastname' => $this->lastname,
            'email' => $this->email,
            'gender' => $this->gender,
            'address' => $this->address ,
            'phone' => $this->phone ,
            'blood_type' => $this->blood_type,
'date_of_birth' => $this->date_of_birth ? $this->date_of_birth->format('Y-m-d') : null,            'last_login_date' => $this->last_login_date,
            'updated_at' => $this->updated_at,
            'created_at' => $this->created_at,
        ];    }
}
