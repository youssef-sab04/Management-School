<?php

namespace App\Http\Requests;

use App\Enums\BloodEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
class UpdateUsersRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        
             return [
            'firstname' => 'required|max:50',
            'lastname' => 'required|max:50',
            'date_of_birth' => 'required|date',
            'parents_id' => 'required|exists:parents,id',
            'gender' => ['required', Rule::in(['m', 'f'])],
            'blood_type' => ['required', Rule::enum(BloodEnum::class)],
            'email' => ['sometimes', 'email', Rule::unique('users')->ignore($this->user)],
             'password' => 'required', 

        ];
        
    }
}
