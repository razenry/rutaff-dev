<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $roles = [
            'Super Admin',
            'Admin',
            'Teacher',
            'Musyrif',
            'Parent',
            'Student',
            'Finance',
            'Security',
            'Public User',
        ];

        foreach ($roles as $role) {
            Role::firstOrCreate(['name' => $role, 'guard_name' => 'api']);
        }

        // Example permissions
        $permissions = [
            'manage-users',
            'manage-institutions',
            'mark-attendance',
            'view-reports',
            'manage-payments',
            'manage-tahfiz',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'api']);
        }

        // Assign all permissions to Super Admin
        $superAdmin = Role::where('name', 'Super Admin')->first();
        $superAdmin->givePermissionTo(Permission::all());
    }
}
