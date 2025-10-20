<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;


class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
  public function store(LoginRequest $request): JsonResponse
{
    $guardUsed = $request->authenticate();  // authentificataion et memem temps retourne de gard soi web teatchers
    
    $user = Auth::guard($guardUsed)->user(); 
    
    $request->session()->regenerate();
    
    return response()->json([
        'user' => $user,
        'token' => $user->createToken('api', [$user->getRoleAttribute()])->plainTextToken ,
        'ability' => $user->getRoleAttribute(),

    ]);
}

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): Response

    {
      $guards = ['web', 'teachers', 'parents', 'admins'];
    $user = null;
    foreach ($guards as $guard) {
      $currentGuard = Auth::guard($guard);
      if ($currentGuard->check()) {
        $user = $currentGuard->user();
        break;
      }
    }
    
    $user->tokens()->delete();
    Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->noContent();
    }
}
