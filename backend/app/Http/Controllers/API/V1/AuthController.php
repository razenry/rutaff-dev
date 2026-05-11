<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\AuthService;
use App\Traits\ApiResponser;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    use ApiResponser;

    protected AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(Request $request): JsonResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return $this->successResponse([
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], 'User registered successfully', 201);
    }

    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
            'device_name' => ['nullable', 'string'],
        ]);

        try {
            $result = $this->authService->login(
                $request->email,
                $request->password,
                $request->device_name ?? 'web'
            );

            return $this->successResponse([
                'user' => $result['user'],
                'access_token' => $result['token'],
                'token_type' => 'Bearer',
            ], 'User logged in successfully');
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 401);
        }
    }

    public function socialLogin(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email',
            'social_id' => 'required|string',
            'social_type' => 'required|string',
            'name' => 'required|string',
        ]);

        $user = User::updateOrCreate(
            ['email' => $request->email],
            [
                'name' => $request->name,
                'social_id' => $request->social_id,
                'social_type' => $request->social_type,
                'email_verified_at' => now(),
            ]
        );

        $token = $user->createToken('auth_token')->plainTextToken;

        return $this->successResponse([
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], 'Social login successful');
    }

    public function redirectToGoogle()
    {
        return response()->json([
            'url' => Socialite::driver('google')->stateless()->redirect()->getTargetUrl(),
        ]);
    }

    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->stateless()->user();
            
            $user = User::updateOrCreate(
                ['email' => $googleUser->getEmail()],
                [
                    'name' => $googleUser->getName(),
                    'social_id' => $googleUser->getId(),
                    'social_type' => 'google',
                    'email_verified_at' => now(),
                ]
            );

            $token = $user->createToken('auth_token')->plainTextToken;

            // Redirect back to frontend with token
            $frontendUrl = env('FRONTEND_URL', 'http://localhost');
            return redirect()->to($frontendUrl . "/login?token=" . $token);

        } catch (\Exception $e) {
            return redirect()->to(env('FRONTEND_URL', 'http://localhost') . "/login?error=sso_failed");
        }
    }

    public function logout(Request $request): JsonResponse
    {
        $this->authService->logout($request->user());
        return $this->successResponse(null, 'User logged out successfully');
    }

    public function me(Request $request): JsonResponse
    {
        $user = $request->user()->load(['roles', 'institution']);
        
        $roles = $user->getRoleNames();
        $permissions = $user->getAllPermissions()->pluck('name');
        
        $userData = $user->toArray();
        $userData['roles'] = $roles;
        $userData['permissions'] = $permissions;

        return $this->successResponse($userData, 'User profile retrieved successfully');
    }
}
