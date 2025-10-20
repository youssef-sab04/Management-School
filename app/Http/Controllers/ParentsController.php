<?php

namespace App\Http\Controllers;

use App\Models\Parents;
use App\Http\Requests\StoreParentsRequest;
use App\Http\Requests\UpdateParentsRequest;
use App\Http\Resources\ParentRessourcess;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Hash;


class ParentsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() : AnonymousResourceCollection
    {
        $parents = Parents::all();
        return ParentRessourcess::collection($parents);
    
    }

    /**
     * Store a newly created resource in storage.
     */
   public function store(StoreParentsRequest $request)


{

    $validated = $request->validated();
    $validated['last_login_date'] = new \DateTime();
    $validated['password'] = Hash::make($validated['password']);

    $parent = Parents::create($validated);
   

    $response =  new ParentRessourcess($parent);
    return response()->json([
        'message' => 'Parent created successfully',
        'data' => $response
    ], 201);
    
}
    /**
     * Display the specified resource.
     */
    public function show(Parents $parents)
    {
        //
     
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateParentsRequest $request, Parents $parent)

    {
        //
        $validated = $request->validated(); 

        $validated['password'] = Hash::make($validated['password']);
        $parent->update($validated);
        return new ParentRessourcess($parent);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Parents $parent)
    {
      
        $parent->delete();
        //$parent->forceDelete();

        return new ParentRessourcess($parent);
        
    }

    public function ParensStats(){
    $nb = Parents::count();


    return [
        "nbP" => $nb ,

    ];


}}
