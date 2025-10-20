<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use App\Http\Requests\StoreTeacherRequest;
use App\Http\Requests\UpdateTeacherRequest;
use App\Http\Resources\TeacherRessourcess;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Hash;

class TeacherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() : AnonymousResourceCollection
    {
        //
        
        $teachers = Teacher::all();
        return TeacherRessourcess::collection($teachers);
    }

    /**
     * Store a newly created resource in storage.
     */
        public function store(StoreTeacherRequest $request)
    {
        $validated = $request->validated();
        $validated['password'] = Hash::make($validated['password']);

        $teacher = Teacher::create($validated);

        $response = new TeacherRessourcess($teacher);
        return response()->json([
            'message' => 'Teacher created successfully',
            'data' => $response
        ], 201);
    }


    /**
     * Display the specified resource.
     */
    public function show(Teacher $teacher)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTeacherRequest $request, Teacher $teacher)
    {
        $validated = $request->validated();

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $teacher->update($validated);
        return new TeacherRessourcess($teacher);
    }

    /**
     * Remove the specified resource from storage.
     */
   public function destroy(Teacher $teacher)
    {
        $teacher->delete();
        return new TeacherRessourcess($teacher);
    }



     public function StatsTeacher(){
    $nb = Teacher::count();


    return [
        "nbT" => $nb,

    ];
}
}
