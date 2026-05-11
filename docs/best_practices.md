# Best Practices for Building with This Project

To maximize the quality and maintainability of your application, follow these guidelines:

## 1. Backend Development

### Keep Controllers Thin
Controllers should only handle:
- Request validation
- Calling a Service or Repository
- Returning a Response

### Use Resources for API Output
Always use Laravel Resources (`php artisan make:resource`) to format your JSON output. This decouples your database structure from your API contract.

### Strictly Use Interfaces
When injecting a Repository into a Controller or Service, always type-hint the **Interface**, not the implementation. This makes your code swappable and testable.

## 2. Frontend Development

### Component Isolation
Break down your UI into small, reusable components in `src/components/`. Avoid massive files in `src/app/`.

### Leverage React Query Hooks
Don't use `useEffect` for data fetching. Use the custom hooks in `src/hooks/`. It provides built-in handling for loading states, caching, and revalidation.

### Use Client vs Server Components
- Use **Server Components** by default for SEO and performance.
- Use **Client Components** (`"use client"`) only when you need interactivity (state, effects, event listeners).

## 3. General Workflow

### Version Control
- Work on feature branches.
- Keep commits small and descriptive.

### Environment Consistency
Ensure all team members use the Docker setup to avoid "it works on my machine" issues.
