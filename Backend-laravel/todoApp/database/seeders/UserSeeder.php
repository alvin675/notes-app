<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Create default admin user
        $admin = \App\Models\User::create([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => \Illuminate\Support\Facades\Hash::make('admin123'),
        ]);

        // Create additional test users with known passwords
        $testUsers = [
            ['name' => 'user1', 'email' => 'user1@test.com', 'password' => 'password123'],
            ['name' => 'user2', 'email' => 'user2@test.com', 'password' => 'password123'],
        ];

        foreach ($testUsers as $userData) {
            \App\Models\User::create([
                'name' => $userData['name'],
                'email' => $userData['email'],
                'password' => \Illuminate\Support\Facades\Hash::make($userData['password']),
            ]);
        }
    }
}
