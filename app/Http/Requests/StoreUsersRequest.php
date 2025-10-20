<?php

namespace App\Http\Requests;

use App\Enums\BloodEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUsersRequest extends FormRequest
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
            'gender' => ['required', Rule::in(['m', 'f'])],
            'blood_type' => ['required', Rule::enum(BloodEnum::class)],
            //'address' => 'required|max:255',
            //'phone' => 'required|max:10|unique:users',
            'parents_id' => 'required|exists:parents,id',
            'email' => 'required|email|unique:users',
                        'classe_id' => 'required|exists:classes,id', // ← AJOUTEZ CETTE LIGNE

            'password' => 'required', 
        ];
    }
}
