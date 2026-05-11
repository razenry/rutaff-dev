<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(
            \App\Interfaces\ArticleRepositoryInterface::class,
            \App\Repositories\ArticleRepository::class
        );
        $this->app->bind(
            \App\Interfaces\TodoRepositoryInterface::class,
            \App\Repositories\TodoRepository::class
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
