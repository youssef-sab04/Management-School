<?php

namespace App\Http\Controllers;

use App\Models\Courses;
use App\Http\Requests\StoreCoursesRequest;
use App\Http\Requests\UpdateCoursesRequest;
use App\Http\Resources\CoursesRessourcess;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;


class CoursesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $courses = Courses::all();
        return CoursesRessourcess::collection($courses);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCoursesRequest $request)
    {
        //
        $course = Courses::create($request->validated());

        $response = new CoursesRessourcess($course);
        return response()->json([
            'message' => 'Course created successfully',
            'data' => $response
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Courses $course)
    {
        //
        return new CoursesRessourcess($course);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCoursesRequest $request, Courses $course)
    {
        //
        $course->update($request->validated());
        return new CoursesRessourcess($course);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Courses $course)
    {
        //
        $course->delete();
        $response  = new CoursesRessourcess($course);

        return [
            "messg" => "deleted succ" ,
            "response" =>$response

        ];

    }
}
