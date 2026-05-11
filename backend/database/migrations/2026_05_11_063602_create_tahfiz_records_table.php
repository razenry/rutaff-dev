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
        Schema::create('tahfiz_records', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('student_id')->constrained('users')->onDelete('cascade');
            $table->foreignUuid('musyrif_id')->constrained('users')->onDelete('cascade');
            $table->string('surah');
            $table->integer('ayah_start')->nullable();
            $table->integer('ayah_end')->nullable();
            $table->enum('type', ['hafalan', 'murojaah']);
            $table->enum('grade', ['A', 'B', 'C', 'D'])->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tahfiz_records');
    }
};
