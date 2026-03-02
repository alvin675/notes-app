<?php

use App\Http\Controllers\SuggestionController;
use Illuminate\Support\Facades\Route;


Route::middleware('api')->group(function () {
    Route::post('/notes/suggestion', [SuggestionController::class, 'getSuggestion']);
});
