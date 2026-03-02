<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class SuggestionController extends Controller
{
    public function getSuggestion(Request $request) {
        $title = $request->input('title');
        $description = $request->input('description');
        
        $userText = "Title: {$title}, Description: {$description}";

        $response = Http::withHeaders([
            'content-type' => 'application/json',
            'x-api-key' => env('CLAUDE_API_KEY'),
            'anthropic-version' => '2023-06-01',
        ])->post('https://api.anthropic.com/v1/messages', [
            'model' => 'claude-opus-4-6',
            'max_tokens' => 1000,
            'thinking' => [
                'type' => 'adaptive'
            ],
            'messages' => [
                ['role' => 'user',
                'content' => "Based on these notes, give me 3 concise suggestions for next notes. Each note has one 
                title and some descriptions. Always return a JSON array instead of text.: " . $userText]
            ],
        ]);

        if($response->failed()) {
            return response()->json([
                'error' => "Claude API Integration Error",
                'details' => $response->json()
            ], $response->status());
        }

        return response()->json([
            'details' => $response->json()
        ]);
    }
}
