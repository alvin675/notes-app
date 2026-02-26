<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Services\JWT;

class AuthController extends Controller
{
    public function login(Request $request) {
        // Value Assign
        $email = $request->input('email');
        $password = $request->input('password');

        $errors = [];  // Empty Array

        // EMAIL CHECK
        if (!$email) {
            $errors['email'][] = "Email is required.";
        }
        else if( !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors['email'][] = "Email is invalid.";
        }

        // PASSWORD CHECK
        if(!$password) {
            $errors['password'][] = "Password is required.";
        }
        else if(strlen($password) < 6) {
            $errors['password'][] = "Password must be at least 6 characters.";
        }

        // Return If Error Exists
        if(!empty($errors)) {
            return response()->json([
                'message' => 'Validation Failed. Try again.',
                'errors' => $errors
            ], 422);
        }
        /*
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);
        */

        $existingUser = User::where('email', $request->email)->first();

        if (!$existingUser || !Hash::check($request->password, $existingUser->password)) {
            return response()->json([
                'message' => 'Invalid username or password'
            ], 401);
        }

        // Give JWT token
        $payload = [
            'sub' => $existingUser->id,
            'eml' => $existingUser->email,
            'iat' => time(),
            'exp' => time() + (60 * 60 * 12)  // Expires after 12 Hours
        ];

        $JWT_token = JWT::CreateJWT($payload);  
        return response()->json([
            'message' => 'Login successful',
            'token' => $JWT_token,  
            'user' => [
                'name' => $existingUser->name,
                'email' => $existingUser->email
            ]
        ], 200);
    }

    public function register(Request $request) {
        $name = $request->input('name');
        $email = $request->input('email');
        $password = $request->input('password');

        $errors = [];

        // Name Check
        if(!$name) {
            $errors['name'][] = "Name is required.";
        }
        else if(!is_string($name)) {
            $errors['name'][] = "Name must be a string";
        }
        else if(strlen($name) > 255 ) {
            $errors['name'][] = "Name exceed the limit";
        }

        // Email Check
        if(!$email) {
            $errors['email'][] = "Email is required.";
        }
        else if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors['email'][] = "Email is invalid.";
        }
        else if(User::where('email', $email)->exists()) {
            $errors['email'][] = "Email already exists.";
        }

        // Password Check
        if(!$password) {
            $errors['password'][] = "Password is required.";
        }
        else if(strlen($password) < 6) {
            $errors['password'][] = "Password must be at least 6 characters.";
        }
        else if(!is_string($password)) {
            $errors['password'][] = "Password must be a string";
        }

        // Return if Erros exists
        if(!empty($errors)) {
            return response()->json([
                'message' => 'Validation Failed. Try again.',
                'errors' => $errors
            ], 422);
        }

        /*
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
        ]);
        */
        $newUser = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $payload = [
            'sub' => $newUser->id,
            'eml' => $newUser->email,
            'iat' => time(),
            'exp' => time() + (60 * 60 * 12)
        ];

        $JWT_token = JWT::CreateJWT($payload);

        return response()->json([
            'message' => 'User registered successfully', 
            'token' => $JWT_token,
            'user' => [
                'name' => $newUser->name,
                'email' => $newUser->email
            ]
        ], 201);
    }
}

