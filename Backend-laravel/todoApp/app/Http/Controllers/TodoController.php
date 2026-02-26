<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Todo;

class TodoController extends Controller
{
    // Create a Instance
    public function store(Request $request) {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'priority_id' => 'required|exists:priorities,id',
            'status_id' => 'required|exists:statuses,id',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date'
        ]);

        // Automatically assign to authenticated user
        $data['user_id'] = $request->auth_user_id;

        $todo = Todo::create($data);

        return response()->json([
            'message' => 'Successfully Created TODO List',
            'data' => $todo
        ], 201);
    }

    // Get Single Value
    public function show(Request $request, $id) {
        $todo = Todo::with([
            'category',
            'priority',
            'status'
        ])->where('user_id', $request->auth_user_id)->find($id);

        if(!$todo) {
            return response()->json([
                'message' => 'Not Found'
            ], 404);
        }

        return response()->json($todo, 200);
    }

    // Get All Data
    public function index(Request $request) {
        $userid = $request->auth_user_id;

        $todos = Todo::where('user_id', $userid)->get();
        // $todos = Todo::with([
        //     'category',
        //     'priority',
        //     'status'
        // ])->where('user_id', auth()->id())->get();

        return response()->json($todos, 200);
    }

    // Update
    public function update(Request $request, $id) {
        $todo = Todo::where('id', $id) -> where('user_id', $request->auth_user_id)->first();

        if(!$todo) {
            return response()->json([
                'message' => 'Not Found'
            ], 404);
        }

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'category_id' => 'sometimes|exists:categories,id',
            'priority_id' => 'sometimes|exists:priorities,id',
            'status_id' => 'sometimes|exists:statuses,id',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date'
        ]);

        $todo->update($validated);

        return response()->json([
            'message' => 'List Updated',
            'data' => $todo
        ], 200);
    }

    // Delete
    public function destroy(Request $request, $id) {
        $todo = Todo::where('id', $id) -> where('user_id', $request->auth_user_id)->first();

        if(!$todo) {
            return response()->json([
                'message' => 'Not Found'
            ], 404);
        }

        $todo->delete();

        return response()->json([
            'message' => 'Deleted Successfully'
        ], 200);
    }
}
