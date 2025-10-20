<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->api(prepend: [
            \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
        ]);

        $middleware->alias([
            'verified' => \App\Http\Middleware\EnsureEmailIsVerified::class,
            'ability' => \Laravel\Sanctum\Http\Middleware\CheckForAnyAbility::class, // Vérifie AU MOINS une ability
            'abilities' => \Laravel\Sanctum\Http\Middleware\CheckAbilities::class, // Vérifie TOUTES les abilities
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();