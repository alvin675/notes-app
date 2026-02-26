<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statuses = ['Pending', 'In Progress', 'Completed', 'On Hold', 'Cancelled'];
        foreach ($statuses as $status) {
            \App\Models\Status::create(['title' => $status]);
        }
    }
}
