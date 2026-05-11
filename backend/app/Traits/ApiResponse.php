<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Symfony\Component\HttpFoundation\Response;

trait ApiResponse
{
    /**
     * Success Response
     */
    protected function success(mixed $data = null, string $message = 'Success', int $code = Response::HTTP_OK): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => $data,
        ], $code);
    }

    /**
     * Error Response
     */
    protected function error(string $message = 'Error', int $code = Response::HTTP_BAD_REQUEST, mixed $errors = null): JsonResponse
    {
        return response()->json([
            'status' => 'error',
            'message' => $message,
            'errors' => $errors,
        ], $code);
    }

    /**
     * Paginated Response
     */
    protected function paginated(ResourceCollection|JsonResource $resource, string $message = 'Success'): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => $resource->response()->getData()->data,
            'meta' => $resource->response()->getData()->meta ?? null,
            'links' => $resource->response()->getData()->links ?? null,
        ]);
    }
}
