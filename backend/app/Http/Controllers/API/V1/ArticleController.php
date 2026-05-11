<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\V1\StoreArticleRequest;
use App\Http\Resources\API\V1\ArticleResource;
use App\Services\ArticleService;
use App\Traits\ApiResponser;
use Illuminate\Http\JsonResponse;

class ArticleController extends Controller
{
    use ApiResponser;

    protected ArticleService $articleService;

    public function __construct(ArticleService $articleService)
    {
        $this->articleService = $articleService;
    }

    public function index(): JsonResponse
    {
        $articles = $this->articleService->getAllArticles();
        return $this->successResponse(
            ArticleResource::collection($articles)->response()->getData(true),
            'Articles retrieved successfully'
        );
    }

    public function store(StoreArticleRequest $request): JsonResponse
    {
        $article = $this->articleService->createArticle($request->validated());
        return $this->successResponse(
            new ArticleResource($article),
            'Article created successfully',
            201
        );
    }

    public function show(int $id): JsonResponse
    {
        $article = $this->articleService->getArticleById($id);
        return $this->successResponse(
            new ArticleResource($article),
            'Article retrieved successfully'
        );
    }

    public function update(StoreArticleRequest $request, int $id): JsonResponse
    {
        $this->articleService->updateArticle($id, $request->validated());
        $article = $this->articleService->getArticleById($id);
        return $this->successResponse(
            new ArticleResource($article),
            'Article updated successfully'
        );
    }

    public function destroy(int $id): JsonResponse
    {
        $this->articleService->deleteArticle($id);
        return $this->noContentResponse();
    }
}
