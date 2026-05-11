# Getting Started

This project is a Full-Stack Learning Management System (LMS) built with Laravel 12 and Next.js 16. It uses Docker for development infrastructure.

## Prerequisites
- Docker & Docker Compose
- Node.js (for local linting/IDE support)
- Composer (optional, if running outside Docker)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd lms-dev
   ```

2. **Setup Environment Files**
   Copy `.env.example` to `.env` in both the root, `backend/`, and `frontend/` directories.
   ```bash
   cp .env.example .env
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```

3. **Start Docker Containers**
   ```bash
   docker compose up -d --build
   ```

4. **Install Dependencies & Migrations**
   The containers will automatically install dependencies. Once they are up, run migrations and seeding:
   ```bash
   docker exec lms_php php artisan migrate --seed
   ```

## Running the Application
- **Frontend**: [http://localhost](http://localhost) (via Nginx)
- **Backend API**: [http://localhost/api/v1](http://localhost/api/v1)
- **Mailpit (Email Testing)**: [http://localhost:8025](http://localhost:8025)
- **PostgreSQL**: `localhost:5432`
