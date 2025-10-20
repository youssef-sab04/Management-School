<?php

namespace App\Http\Controllers;

use App\Models\ClassType;
use App\Http\Requests\StoreClassTypeRequest;
use App\Http\Requests\UpdateClassTypeRequest;
use App\Http\Resources\ClassTypeRessourcess;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;


class ClassTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
   public function index(): AnonymousResourceCollection
    {
        $classTypes = ClassType::all();
        return ClassTypeRessourcess::collection($classTypes);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreClassTypeRequest $request)
    {
        $classType = ClassType::create($request->validated());

        $response = new ClassTypeRessourcess($classType);
        return response()->json([
            'message' => 'Class type created successfully',
            'data' => $response
        ], 201);
    }

   /**
     * Display the specified resource.
     */
    public function show(ClassType $classType)
    {
        return new ClassTypeRessourcess($classType);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateClassTypeRequest $request, ClassType $classesT)
    {
        $classesT->update($request->validated());
        return new ClassTypeRessourcess($classesT);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ClassType $classesT)
    {
        $classesT->delete();
        return new ClassTypeRessourcess($classesT);
    }

    public function ClasseTypeStats(){
    $nb = ClassType::count();


    return [
        "nbct" => $nb ,

    ];

}}
