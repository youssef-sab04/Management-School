<?php

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
        Schema::table('users', function (Blueprint $table) {
            //
            $table->dropForeign(['parents_id']);
            
            // 2. Puis supprimer la colonne
            $table->dropColumn('parents_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            //
 $table->unsignedBigInteger('parents_id')->nullable();
            
            // Recréer la contrainte
            $table->foreign('parents_id')
                  ->references('id')
                  ->on('parents')
                  ->onDelete('cascade');
        });
    }
};
