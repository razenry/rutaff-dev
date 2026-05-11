<?php

use App\Http\Controllers\API\V1\ArticleController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::get('/health', function () {
        return response()->json(['status' => 'OK', 'timestamp' => now()]);
    });

    Route::apiResource('articles', ArticleController::class);
});
