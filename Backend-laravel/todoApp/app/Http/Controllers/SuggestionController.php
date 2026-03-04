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
            'model' => 'claude-opus-4-5',
            'max_tokens' => 1000,
            'system' => "You are a note-taking assistance. Respond ONLY with a raw JSON array of objects. Each object must have a 'title' string and a 'descriptions' array of strings. Do not include markdown backticks or any other text.",
            'messages' => [
                ['role' => 'user',
                'content' => "Provide 3 next note suggestions for: " . $userText]
            ],
        ]);

        if($response->failed()) {
            return response()->json([
                'error' => "Claude API Integration Error",
                'details' => $response->json()
            ], $response->status());
        }

        $content = json_decode($response->json('content.0.text'), true);

        return response()->json([
            'details' => $content,
        ], 200);
    }
}
