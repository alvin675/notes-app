<?php

use App\Http\Controllers\TodoController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['jwtCheck'])->group(function () {
    Route::post('/todo', [TodoController::class, 'store']);         //Create
    Route::get('/todo/{id}', [TodoController::class, 'show']);      // Read Single item
    Route::get('/todo', [TodoController::class, 'index']);          // Read All items
    Route::put('/todo/{id}', [TodoController::class, 'update']);    // Update
    Route::delete('/todo/{id}', [TodoController::class, 'destroy']);// Delete
});

