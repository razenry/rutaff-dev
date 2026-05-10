<?php

namespace App\Services;

use App\DTOs\Auth\LoginDTO;
use App\DTOs\Auth\RegisterDTO;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthService
{
    public function register(RegisterDTO $dto): array
    {
        $user = User::create([
            'name' => $dto->name,
            'email' => $dto->email,
            'password' => $dto->password, // Hashes automatically via User model casts
            'fcm_token' => $dto->fcm_token,
            'device_id' => $dto->device_name,
        ]);

        $tokenName = $dto->device_name ?? 'default_device';
        $token = $user->createToken($tokenName)->plainTextToken;

        return [
            'user' => $user,
            'token' => $token
        ];
    }

    public function login(LoginDTO $dto): array
    {
        $user = User::where('email', $dto->email)->first();

        if (!$user || !Hash::check($dto->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        if ($dto->fcm_token || $dto->device_name) {
            $user->update([
                'fcm_token' => $dto->fcm_token ?? $user->fcm_token,
                'device_id' => $dto->device_name ?? $user->device_id,
            ]);
        }

        $tokenName = $dto->device_name ?? 'default_device';
        
        $user->tokens()->where('name', $tokenName)->delete();

        $token = $user->createToken($tokenName)->plainTextToken;

        return [
            'user' => $user,
            'token' => $token
        ];
    }
}
