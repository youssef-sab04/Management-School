<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ParentsController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\ClassTypeController;
use App\Http\Controllers\ClasseController;
use App\Http\Controllers\CoursesController;
use App\Http\Controllers\ClassTypeCourseController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\ExamsRecordController;
use App\Http\Controllers\ContenuCoursController;
use App\Http\Controllers\DeclarationController;
use App\Http\Controllers\ContactController;

use App\Models\Classe;
use App\Models\ClassType;

/*
Route::middleware(['auth:sanctum', 'ability:student'])->prefix('student')->group(static function () {
    Route::get('/', function (Request $request) {
        return $request->user();
    });
});
// api/teatcher


Route::middleware(['auth:sanctum', 'ability:admin'])->prefix('admin')->group(static function () {
    Route::get('/', function (Request $request) {
        return $request->user();
    });
});

Route::middleware(['auth:sanctum', 'ability:teacher'])->prefix('teacher')->group(static function () {
    Route::get('/', function (Request $request) {
        return $request->user();
    });
});

Route::middleware(['auth:sanctum', 'ability:parent'])->prefix('parent')->group(static function () {
    Route::get('/', function (Request $request) {
        return $request->user();
    });
});
*/
Route::middleware(['auth:sanctum'])->group(static function () {
  Route::get('/me', function (Request $request) {
    $token = $request->bearerToken();
    $accessToken = \Laravel\Sanctum\PersonalAccessToken::findToken($token);
    $user = $accessToken->tokenable; 
    
    return [
        'user' => $user,
        'role' => $user->getRoleAttribute(),
    ];
  });
});


Route::middleware(['auth:sanctum', 'ability:admin'])->prefix('admin')->group(static function () {
  Route::apiResources([
    'parents' => ParentsController::class,
    'users'   => StudentController::class,
    'teachers' =>TeacherController::class,
    'classesT' =>ClassTypeController::class,
    'classe' => ClasseController::class ,
    'courses' => CoursesController::class ,
    'classtype_courses' => ClassTypeCourseController::class ,
   
  ]);
});
Route::middleware(['auth:sanctum', 'ability:teacher'])->prefix('teacher')->group(static function () {
  // Routes en lecture seule pour les teachers
  Route::get('parents', [ParentsController::class, 'index']);
  Route::get('users', [StudentController::class, 'index']);
  Route::get('teachers', [TeacherController::class, 'index']);
  Route::get('classesT', [ClassTypeController::class, 'index']);
  Route::get('classe', [ClasseController::class, 'index']);
  Route::get('courses', [CoursesController::class, 'index']);
  Route::get('classtype_courses', [ClassTypeCourseController::class, 'index']);
  // api/teacher/classestype_courses 
  
  // Routes complètes pour les examens
  Route::apiResources([
    'exam' => ExamController::class,
    'examsRecord' => ExamsRecordController::class,
    'contenuCours' => ContenuCoursController::class,
  ]);
});

Route::middleware(['auth:sanctum', 'ability:admin'])->prefix('admin')->group(function () {
    Route::get('/stats/students', [StudentController::class, 'StudentStats']);
});
Route::middleware(['auth:sanctum', 'ability:admin'])->prefix('admin')->group(function () {
    Route::get('/stats/parents', [ParentsController::class, 'ParensStats']);
});
Route::middleware(['auth:sanctum', 'ability:admin'])->prefix('admin')->group(function () {
    Route::get('/stats/teachers', [TeacherController::class, 'StatsTeacher']);
});
Route::middleware(['auth:sanctum', 'ability:admin'])->prefix('admin')->group(function () {
    Route::get('/stats/records', [ExamsRecordController::class, 'RecordsStats']);
});

Route::middleware(['auth:sanctum', 'ability:admin'])->prefix('admin')->group(function () {
    Route::get('/stats/classe', [ClasseController::class, 'ClasseStats']);

});
Route::middleware(['auth:sanctum', 'ability:admin'])->prefix('admin')->group(function () {
    Route::get('/stats/classesT', [ClassTypeController::class, 'ClasseTypeStats']);
});

Route::middleware(['auth:sanctum', 'ability:student'])->prefix('student')->group(function () {
    Route::get('/note/{id}', [ExamsRecordController::class, 'GetStudentRecord']);
});


Route::middleware(['auth:sanctum', 'ability:student'])->prefix('student')->group(static function () {
  Route::get('teachers', [TeacherController::class, 'index']);
  Route::get('classe', [ClasseController::class, 'index']);
  
  // Routes complètes pour les examens
  Route::apiResources([
    'declaration' => DeclarationController::class,
  ]);
});

Route::post('contact', [ContactController::class, 'store']);


require __DIR__.'/auth.php';
