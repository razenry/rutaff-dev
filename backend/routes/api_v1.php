<?php

use App\Http\Controllers\API\V1\ArticleController;
use App\Http\Controllers\API\V1\AttendanceController;
use App\Http\Controllers\API\V1\AuthController;
use App\Http\Controllers\API\V1\TahfizController;
use App\Http\Controllers\API\V1\TransactionController;
use App\Http\Controllers\API\V1\TodoController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::get('/health', function () {
        return response()->json(['status' => 'OK', 'timestamp' => now()]);
    });

    // Auth Routes
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/social-login', [AuthController::class, 'socialLogin']);
    Route::get('/auth/google/redirect', [AuthController::class, 'redirectToGoogle']);
    Route::get('/auth/google/callback', [AuthController::class, 'handleGoogleCallback']);
    
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);
        Route::apiResource('todos', TodoController::class);
        
        // Attendance Routes
        Route::get('/attendance/today', [AttendanceController::class, 'today']);
        Route::post('/attendance', [AttendanceController::class, 'store']);
        Route::get('/attendance', [AttendanceController::class, 'index']);

        // Tahfiz Routes
        Route::get('/tahfiz', [TahfizController::class, 'index']);
        Route::post('/tahfiz', [TahfizController::class, 'store']);

        // Transaction Routes
        Route::get('/transactions', [TransactionController::class, 'index']);
        Route::post('/transactions', [TransactionController::class, 'store']);
        Route::get('/wallet', [TransactionController::class, 'wallet']);

        // Academic Routes
        Route::get('/subjects', [\App\Http\Controllers\API\V1\AcademicController::class, 'subjects']);
        Route::post('/grades', [\App\Http\Controllers\API\V1\AcademicController::class, 'recordGrade']);
        Route::get('/academic/report', [\App\Http\Controllers\API\V1\AcademicController::class, 'report']);
    });

    // Public Webhook
    Route::post('/payments/webhook', [TransactionController::class, 'webhook']);

    Route::apiResource('articles', ArticleController::class);
});
