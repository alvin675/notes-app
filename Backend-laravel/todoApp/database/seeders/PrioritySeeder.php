<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PrioritySeeder extends Seeder
{
    public function run(): void
    {
        $priorities = ['Low', 'Medium', 'High', 'Urgent', 'Immediate'];
        foreach ($priorities as $priority) {
            \App\Models\Priority::create(['title' => $priority]);
        }
    }
}
