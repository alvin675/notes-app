<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Services\JWT;

class JWTMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $header = $request->header('Authorization');

        if(!$header || !str_starts_with($header, 'Bearer')) {
            return response()->json([
                'message' => 'Authorization header missing.'
            ], 401);
        }

        $jwt_token = str_replace('Bearer ', '', $header);

        $payload = JWT::VerifyJWT($jwt_token);

        if(!$payload) {
            return response()->json([
                'message' => 'Invalid token!'
            ], 401);
        }

        $request->merge([
            'auth_user_id' => $payload->sub
        ]);

        return $next($request);
    }
}
