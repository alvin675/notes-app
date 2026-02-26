<?php

namespace App\Services;



class JWT{

    public static function CreateJWT($payload) {
        $header = [
            'alg' => 'HS256',
            'typ' => 'JWT'    
        ];
        // $payload -> sub, eml, iat, exp

        $secret_key = env('JWT_SECRET_KEY', 'fIRst-93-App'); // With fallback
        
        
        $encoded_header = self::base64UrlEncode(json_encode($header));
        $encoded_payload = self::base64UrlEncode(json_encode($payload));

        $encoded_data = $encoded_header . "." . $encoded_payload;

        $signature = hash_hmac('sha256', $encoded_data, $secret_key, true);
        $encoded_signature = self::base64UrlEncode($signature);

        $JWT = $encoded_header . "." . $encoded_payload . "." . $encoded_signature;

        return $JWT;
    }

    public static function VerifyJWT($token) {
        if (empty($token))  return false;
        
        $parts = explode('.', $token);
        if (count($parts) !== 3)  return false;
        
        list($header, $payload, $signature) = $parts;
        
        $secret_key = env('JWT_SECRET_KEY', 'fIRst-93-App');   // Fallback
        
        // Verify signature
        $main_data = $header . '.' . $payload;
        $expected_signature = hash_hmac('sha256', $main_data, $secret_key, true);
        $expected_signature_encoded = self::base64UrlEncode($expected_signature);
        
        if (!hash_equals($signature, $expected_signature_encoded)) {
            return false;
        }
        
        // Decode payload
        $decoded_payload = json_decode(self::base64UrlDecode($payload));
        
        // Check expiration
        if (isset($decoded_payload->exp) && time() > $decoded_payload->exp) {   // isset() check - exists and Not null?
            return false;
        }
        
        return $decoded_payload;
    }


    public static function base64UrlEncode($data) {
        $base64 = base64_encode($data);
        return str_replace(['+', '/', '='], ['-', '_', ''], $base64);
    }

    public static function base64UrlDecode($data) {
        $remainder = strlen($data)%4;
        if($remainder) {
            $data .= str_repeat('=', 4 - $remainder);
        }

        $base64 = str_replace(['-', '_'], ['+','/'], $data);
        return base64_decode($base64);
    }

}