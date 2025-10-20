<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\StoreUsersRequest;
use App\Http\Requests\UpdateUsersRequest;
use App\Http\Resources\UserRessourcess;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Hash;



class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $users = User::all();
        return UserRessourcess::collection($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUsersRequest $request)
    {
        //
    $validated = $request->validated();
    $validated['last_login_date'] = new \DateTime();
    $validated['password'] = Hash::make($validated['password']);



    $user = User::create($validated);
   

    return response()->json([
        'message' => 'Student created successfully',
        'data' => $user
    ], 201);


    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUsersRequest $request, User $user)
    {
        //
         $validated = $request->validated(); 

        $validated['password'] = Hash::make($validated['password']);
        $user->update($validated);
        return ($user);

    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
         $user->delete();
        //$parent->forceDelete();

        return new UserRessourcess($user);
    }

 public function StudentStats(){
    $nb = User::count();
    $nbg = User::where('gender', 'f')->count(); 
    $nbb = User::where('gender', 'm')->count(); 

    return [
        "nbE" => $nb,
        "g" => $nbg,
        "b" => $nbb,
    ];
}


}
