<?php

namespace App\Http\Controllers;

use App\Models\ClassTypeCourse;
use App\Http\Requests\StoreClassTypeCourseRequest;
use App\Http\Requests\UpdateClassTypeCourseRequest;
use App\Http\Resources\ClassTypeCourseRessourcess;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;


class ClassTypeCourseController extends Controller
{
 /**
     * Display a listing of the resource.
     */
    public function index(): AnonymousResourceCollection
    {
        $classTypeCourses = ClassTypeCourse::with(['course', 'classe'])->get();
        return ClassTypeCourseRessourcess::collection($classTypeCourses);
    }
//classtype_course
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreClassTypeCourseRequest $request)
    {
        $classTypeCourse = ClassTypeCourse::create($request->validated());

        $response = new ClassTypeCourseRessourcess($classTypeCourse->load(['course', 'classe']));
        return response()->json([
            'message' => 'Class type course created successfully',
            'data' => $response
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(ClassTypeCourse $classtype_course)
    {
        return new ClassTypeCourseRessourcess($classtype_course->load(['course', 'classe']));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateClassTypeCourseRequest $request, ClassTypeCourse $classtype_course)
    {
        $classtype_course->update($request->validated());
        return new ClassTypeCourseRessourcess($classtype_course->load(['course', 'classe']));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ClassTypeCourse $classtype_course)
    {
        $classtype_course->delete();
        return new ClassTypeCourseRessourcess($classtype_course);
    }
}
