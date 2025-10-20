<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Classe;
use App\Models\ExamsRecord;
use App\Models\Exam;
use App\Models\Teacher;
use App\Models\User;





return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('declarations', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignIdFor(ExamsRecord::class)->nullable()->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Exam::class)->nullable()->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Classe::class)->nullable()->constrained()->cascadeOnDelete();
            $table->foreignIdFor(User::class)->nullable()->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Teacher::class)->nullable()->constrained()->cascadeOnDelete();






        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('declarations');
    }
};
