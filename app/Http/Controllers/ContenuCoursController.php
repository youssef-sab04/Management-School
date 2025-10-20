<?php

namespace App\Http\Controllers;

use App\Models\ContenuCours;
use App\Http\Requests\StoreContenuCoursRequest;
use App\Http\Requests\UpdateContenuCoursRequest;
use App\Http\Resources\ContenuCoursResources;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ContenuCoursController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        $contenuCours = ContenuCours::with(['classe', 'classTypeCourse', 'teacher'])->get();
        return ContenuCoursResources::collection($contenuCours);
    }

    public function store(StoreContenuCoursRequest $request)
    {
        $contenuCours = ContenuCours::create($request->validated());

        $response = new ContenuCoursResources($contenuCours->load(['classe', 'classTypeCourse', 'teacher']));
        return response()->json([
            'message' => 'Contenu cours created successfully',
            'data' => $response
        ], 201);
    }

    public function show(ContenuCours $contenuCours)
    {
        return new ContenuCoursResources($contenuCours->load(['classe', 'classTypeCourse', 'teacher']));
    }

    public function update(UpdateContenuCoursRequest $request, ContenuCours $contenuCour)
    {
        $contenuCour->update($request->validated());
        return new ContenuCoursResources($contenuCour->load(['classe', 'classTypeCourse', 'teacher']));
    }

    public function destroy(ContenuCours $contenuCour)
    {
        $contenuCour->delete();
        return "supprime par succes";
    }
}