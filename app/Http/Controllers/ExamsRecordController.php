<?php

namespace App\Http\Controllers;

use App\Models\ExamsRecord;
use App\Http\Requests\StoreExamsRecordRequest;
use App\Http\Requests\UpdateExamsRecordRequest;
use App\Http\Resources\ExamsRecordResources;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ExamsRecordController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): AnonymousResourceCollection
    {
        $examsRecords = ExamsRecord::with(['exam', 'user'])->get();
        return ExamsRecordResources::collection($examsRecords);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreExamsRecordRequest $request)
    {
        $examsRecord = ExamsRecord::create($request->validated());

        $response = new ExamsRecordResources($examsRecord->load(['exam', 'user']));
        return response()->json([
            'message' => 'Exams record created successfully',
            'data' => $response
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(ExamsRecord $examsRecord)
    {
        return new ExamsRecordResources($examsRecord->load(['exam', 'user']));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateExamsRecordRequest $request, ExamsRecord $examsRecord)
    {
        $examsRecord->update($request->validated());
        return new ExamsRecordResources($examsRecord->load(['exam', 'user']));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ExamsRecord $examsRecord)
    {
        $examsRecord->delete();
        return new ExamsRecordResources($examsRecord);
    }
   public function RecordsStats(){
    $A = ExamsRecord::where('note', '>=', 15)->count(); 
    $B = ExamsRecord::whereBetween('note', [10, 14.99])->count(); 
    $C = ExamsRecord::where('note', '<', 10)->count(); 

    return [
        "excellent" => $A,  
        "moyen" => $B,      
        "faible" => $C      
    ];
}

    public function GetStudentRecord($id)
{
 $examsRecords = ExamsRecord::where('user_id', $id)
    ->join('users', 'exams_records.user_id', '=', 'users.id')
    ->join('exams', 'exams_records.exam_id', '=', 'exams.id')
    ->join('teachers', 'exams.teacher_id', '=', 'teachers.id') // ← JOIN teacher via exams
    ->join('classes', 'exams.classe_id', '=', 'classes.id')     // ← JOIN class via exams
    ->select('exams_records.*', 
             'users.firstname as student_name', 
             'exams.name as Nom_exam',
             'teachers.firstname as teacher_firstname',
             'teachers.lastname as teacher_lastname',
             'classes.name as class_name' , 'teachers.id as teacherid' , 'classes.id as class_id')
    ->get();

return $examsRecords;
}


}

