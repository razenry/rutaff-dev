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
        // Create Roles
        $roles = [
            'Super Admin',
            'Admin',
            'Teacher',
            'Musyrif',
            'Parent',
            'Student',
            'Finance',
            'Security',
            'Public User'
        ];

        foreach ($roles as $role) {
            \Spatie\Permission\Models\Role::firstOrCreate(['name' => $role]);
        }

        // Create Super Admin User
        $superAdmin = User::firstOrCreate(
            ['email' => 'superadmin@rutaf.com'],
            [
                'name' => 'Super Admin Rutaf',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
            ]
        );
        $superAdmin->assignRole('Super Admin');

        \App\Models\Article::create([
            'title' => 'Selamat Datang di RUTAF SUPER APP',
            'content' => 'Ini adalah artikel pertama di platform RUTAF SUPER APP kami.',
        ]);
    }
}
