<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Interfaces\UserRepositoryInterface;
use App\Repositories\UserRepository;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(\App\Interfaces\UserRepositoryInterface::class, \App\Repositories\UserRepository::class);
        $this->app->bind(\App\Interfaces\AttendanceRepositoryInterface::class, \App\Repositories\AttendanceRepository::class);
        $this->app->bind(\App\Interfaces\TahfizRepositoryInterface::class, \App\Repositories\TahfizRepository::class);
        $this->app->bind(\App\Interfaces\TransactionRepositoryInterface::class, \App\Repositories\TransactionRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
