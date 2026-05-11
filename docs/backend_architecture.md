# Backend Architecture

The backend is built with **Laravel 12** and follows the **Repository Pattern** to ensure clean code and easy testing.

## Core Concepts

### 1. Repository Pattern
We separate data access logic from the controllers using Interfaces and Repositories.
- **Interfaces**: Located in `app/Interfaces/`. Defines the contract.
- **Repositories**: Located in `app/Repositories/`. Implements the contract using Eloquent.
- **Base Repository**: A generic `BaseRepository` handles common CRUD operations to avoid repetition.

### 2. API Responser Trait
We use a Trait (`app/Traits/ApiResponser.php`) in all controllers to ensure a consistent JSON response format:
```json
{
    "status": "Success",
    "message": "Message here",
    "data": { ... }
}
```

### 3. Authentication (Sanctum)
We use **Laravel Sanctum** for token-based authentication.
- Users must have the `HasApiTokens` trait in the `User` model.
- Routes are protected via the `auth:sanctum` middleware.

## Folder Structure
- `app/Http/Controllers/API/V1/`: API Controllers.
- `app/Services/`: Business logic (if too complex for controllers).
- `app/Http/Resources/API/V1/`: JSON Resources for formatting API output.
- `routes/api_v1.php`: Versioned API routes.
