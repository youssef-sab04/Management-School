<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use App\Http\Requests\StoreExamRequest;
use App\Http\Requests\UpdateExamRequest;
use App\Http\Resources\ExamResource;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ExamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): AnonymousResourceCollection
    {
        // eager load relations to avoid N+1
        $exams = Exam::with(['teacher', 'classe', 'classTypeCourse'])->get();
        return ExamResource::collection($exams);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreExamRequest $request)
    {
        $validated = $request->validated();

        $exam = Exam::create($validated);

        return response()->json([
            'message' => 'Exam created successfully',
            'data' => new ExamResource($exam)
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Exam $exam)
    {
        $exam->load(['teacher', 'classe', 'classTypeCourse']);
        return new ExamResource($exam);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateExamRequest $request, Exam $exam)
    {
        $validated = $request->validated();

        $exam->update($validated);

        return new ExamResource($exam);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Exam $exam)
    {
        $exam->delete();
        return new ExamResource($exam);
    }
}
