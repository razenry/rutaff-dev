<?php

namespace App\Services;

use App\Interfaces\ArticleRepositoryInterface;

class ArticleService extends BaseService
{
    protected ArticleRepositoryInterface $articleRepository;

    public function __construct(ArticleRepositoryInterface $articleRepository)
    {
        $this->articleRepository = $articleRepository;
    }

    public function getAllArticles()
    {
        return $this->articleRepository->paginate();
    }

    public function getArticleById(int $id)
    {
        return $this->articleRepository->findById($id);
    }

    public function createArticle(array $data)
    {
        return $this->articleRepository->create($data);
    }

    public function updateArticle(int $id, array $data)
    {
        return $this->articleRepository->update($id, $data);
    }

    public function deleteArticle(int $id)
    {
        return $this->articleRepository->delete($id);
    }
}
