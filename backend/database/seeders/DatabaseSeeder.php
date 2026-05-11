<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        \App\Models\Article::create([
            'title' => 'Selamat Datang di LMS',
            'content' => 'Ini adalah artikel pertama di platform Learning Management System kami.',
        ]);

        \App\Models\Article::create([
            'title' => 'Panduan Belajar',
            'content' => 'Pelajari cara menggunakan fitur-fitur yang tersedia untuk memaksimalkan pembelajaran Anda.',
        ]);
    }
}
