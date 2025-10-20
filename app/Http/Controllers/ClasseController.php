<?php

namespace App\Http\Controllers;

use App\Models\Classe;
use App\Http\Requests\StoreClasseRequest;
use App\Http\Requests\UpdateClasseRequest;
use App\Http\Resources\ClasseRessourcess;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ClasseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() :  AnonymousResourceCollection
    {
        //
        $class = Classe::all();
        return ClasseRessourcess::collection($class);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreClasseRequest $request)
    {
        $classType = Classe::create($request->validated());

       // $response = new ClassRessourcess($classType);
        return response()->json([
            'message' => 'Class type created successfully',
          //  'data' => $response
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Classe $classe)
    {
        return new ClasseRessourcess($classe);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateClasseRequest $request, Classe $classe)
    {
        $classe->update($request->validated());
        return new ClasseRessourcess($classe);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Classe $classe)
    {
        //
         $classe->delete();
        return new ClasseRessourcess($classe);

    }

    public function ClasseStats(){
    $nb = Classe::count();


    return [
        "nbc" => $nb ,

    ];

   
}
}