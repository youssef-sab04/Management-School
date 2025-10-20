<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;


class ContactController extends Controller
{
    //
     public function store(Request $request)
    {
        $validated = $request->validate([
            'Name' => 'required|string|max:50',
            'Email' => 'required|email|max:50',
            'Object' => 'required|string|max:50',
            'Message' => 'required|string|max:255'
        ]);

        $contact = Contact::create($validated);

        return response()->json([
            'message' => 'Message sent successfully',
            'data' => $contact
        ], 201);
    }
}
