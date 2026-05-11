# Enterprise Fullstack Boilerplate (Laravel + Next.js + Docker)

This is a production-ready enterprise-scale monorepo architecture featuring a Laravel REST API backend and a Next.js App Router frontend, all containerized with Docker.

## 🚀 Quick Start

Ensure you have **Docker** and **Make** installed on your system.

### 1. Automated Setup
The easiest way to get started is using the provided `Makefile`:

```bash
make setup
```

This command will:
- Copy `.env.example` to `.env` in root, backend, and frontend.
- Build and start all Docker containers.
- Install PHP dependencies via Composer.
- Generate application keys and run database migrations/seeders.
- Install Node.js dependencies for the frontend.

### 2. Manual Setup (If Make is not available)
If you don't have `make`, run these commands:
```bash
# Copy env files
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Build and start
docker compose up -d --build

# Backend initialization
docker compose exec php composer install
docker compose exec php php artisan key:generate
docker compose exec php php artisan migrate --seed

# Frontend initialization
docker compose exec frontend npm install
```

---

## 🏗️ Architecture Overview

### Backend (Laravel)
Located in `/backend`, follows **Clean Architecture** principles:
- **Interfaces & Repositories**: Data access abstraction.
- **Services**: Business logic layer.
- **Actions**: Single-responsibility logic classes.
- **DTOs**: Data Transfer Objects for typed data flow.
- **API Resources**: Standardized JSON transformations.
- **Versioned API**: Routes are managed under `api/v1`.

### Frontend (Next.js)
Located in `/frontend`, follows **Feature-Based Architecture**:
- **TanStack Query**: For efficient server state management and caching.
- **Zod & React Hook Form**: For robust type-safe form validation.
- **Axios**: Centralized API client with interceptors.
- **PWA**: Out-of-the-box support for "Add to Home Screen".

---

## 🛠️ Available Services

Once the containers are running, you can access:

| Service | URL | Description |
| :--- | :--- | :--- |
| **Frontend** | [http://localhost](http://localhost) | Next.js Application (via Nginx) |
| **Backend API** | [http://localhost/api/v1](http://localhost/api/v1) | Laravel REST API |
| **API Health** | [http://localhost/api/v1/health](http://localhost/api/v1/health) | API Status Check |
| **Horizon** | [http://localhost/horizon](http://localhost/horizon) | Queue Monitoring Dashboard |
| **Telescope** | [http://localhost/telescope](http://localhost/telescope) | Debugging and Profiling tool |
| **Mailpit** | [http://localhost:8025](http://localhost:8025) | Local email testing interface |
| **Database** | `localhost:5432` | PostgreSQL Database |

---

## 💻 Common Commands

| Command | Description |
| :--- | :--- |
| `make up` | Start all services in the background |
| `make down` | Stop all services |
| `make build` | Rebuild Docker images |
| `make test` | Run PestPHP tests in the backend |
| `make shell-backend` | Open a bash terminal inside the PHP container |
| `make shell-frontend` | Open a terminal inside the Node container |

---

## 📄 Documentation

- **Swagger/OpenAPI**: API documentation is available at `http://localhost/docs`.
- **Environment**: All configuration is managed via `.env` files in the respective directories.
