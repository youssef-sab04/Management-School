<?php

namespace App\Http\Controllers;
use App\Models\Declaration;

use Illuminate\Http\Request;
use App\Http\Requests\StoreDeclaration;
use App\Http\Resources\DeclarationRessource;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class DeclarationController extends Controller
{
    //

    public function index(): AnonymousResourceCollection
    {
        $declarations = Declaration::with(['teacher', 'classe', 'exam', 'user'])->get();
        return DeclarationRessource::collection($declarations);
    }

    public function store(StoreDeclaration $request)
    {
        $validated = $request->validated();

        $declaration = Declaration::create($validated);

        return response()->json([
            'message' => 'Declaration created successfully',
            'data' => new DeclarationRessource($declaration)
        ], 201);
    }


    public function showstatusEnCours(){
        $dec = Declaration::where('status' , 'en_cours')->get();

        return [
            'messg' => 'succes',
            'output' => $dec
        ];
    }

     public function showstatusvalide(){
        $dec = Declaration::where('status' , 'valide')->get();

        return [
            'messg' => 'succes',
            'output' => $dec
        ];
    }
   
}
