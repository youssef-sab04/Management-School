<?php
use App\Models\ClassType;
use App\Models\Courses;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('class_type_courses', function (Blueprint $table) {
           $table->id();
            $table->foreignIdFor(ClassType::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Courses::class)->constrained()->cascadeOnDelete();
            $table->unsignedTinyInteger('coef');
            $table->softDeletes();
            $table->timestamps();
            // Course ANglais , claasType course : Ang1 ang2  lie a claas type par exemple meca 2
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('class_type_courses');
    }
};
