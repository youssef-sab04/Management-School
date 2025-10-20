<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Classe;
use App\Models\ClassTypeCourse;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        //
          Schema::table('exams', function (Blueprint $table) {

            $table->foreignIdFor(ClassTypeCourse::class)->constrained()->cascadeOnDelete();
            $table->dropForeign(['courses_id']);



            // Course ANglais , claasType course : Ang1 ang2  lie a claas type par exemple meca 2
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
         Schema::table('exams', function (Blueprint $table) {

       $table->foreignIdFor(Classe::class)->constrained()->cascadeOnDelete();

        $table->dropForeign(['class_type_course_id']);}); 

    }
};
