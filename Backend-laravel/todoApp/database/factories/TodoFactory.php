<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Category;
use App\Models\Priority;
use App\Models\Status;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Todo>
 */
class TodoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(4),
            'description' => fake()->paragraph(),
            'user_id' => fake()->randomElement([1, 2, 3]), // Include admin user (ID: 1)
            'category_id' => Category::pluck('id')->random(),
            'priority_id' => Priority::pluck('id')->random(),
            'status_id' => Status::pluck('id')->random(),
            'due_date' => fake()->dateTimeBetween('now', '+1 month'),
        ];
    }
}
