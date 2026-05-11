.PHONY: setup up down build test shell-backend shell-frontend

setup:
	cp .env.example .env
	cd backend && cp .env.example .env
	cd frontend && cp .env.example .env
	docker compose build
	docker compose up -d
	docker compose exec php composer install
	docker compose exec php php artisan key:generate
	docker compose exec php php artisan migrate --seed
	docker compose exec frontend npm install
	@echo "Setup complete! The application should be available at http://localhost"

up:
	docker compose up -d

down:
	docker compose down

build:
	docker compose build

test:
	docker compose exec php php artisan test

shell-backend:
	docker compose exec php bash

shell-frontend:
	docker compose exec frontend sh
