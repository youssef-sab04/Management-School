<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Classe;
use App\Models\ClassType;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        //
        Schema::table('class_type_courses', function (Blueprint $table) {
            $table->dropForeign(['class_type_id']);
            $table->foreignIdFor(Classe::class)->constrained()->cascadeOnDelete();

            // Course ANglais , claasType course : Ang1 ang2  lie a claas type par exemple meca 2
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
            Schema::table('class_type_courses', function (Blueprint $table) {
                $table->foreignIdFor(ClassType::class)->constrained()->cascadeOnDelete();
                            $table->dropForeign(['class_id']);


            
        });

    }
};
