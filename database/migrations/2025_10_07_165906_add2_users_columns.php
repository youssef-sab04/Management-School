<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Parents;

return new class extends Migration
{
    /**
     * Run the migrations.
     */

    /*
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->enum('blood_type', [
                'O-',
                'O+', 
                'A+',
                'A-',
                'B+',
                'B-',
                'AB+',
                'AB-'
            ])->nullable(); 

            
            
        }); // Parenthèse fermante manquante
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('blood_type');
        }); 
    }
    
};
