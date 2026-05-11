# Frontend Architecture

The frontend is built with **Next.js 16** (App Router) and uses **Tailwind CSS** for styling.

## Tech Stack
- **Framework**: Next.js 16 (Turbopack enabled)
- **State Management**: Zustand (with Persist middleware)
- **Data Fetching**: React Query (TanStack Query)
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Core Concepts

### 1. State Management (Zustand)
Authentication state is managed in `src/store/useAuthStore.ts`. It persists the user info and token to `localStorage` automatically.

### 2. Data Fetching (React Query)
We use hooks for all API interactions (`src/hooks/`). This handles:
- Caching
- Loading/Error states
- Automatic re-fetching
- Invalidation after mutations (e.g., refreshing the list after creating a todo)

### 3. Services Layer
API calls are abstracted into services (`src/services/`). Each service corresponds to a backend resource.

### 4. Axios Configuration
Located in `src/lib/axios.ts`. It handles:
- Base URL configuration
- Automatic injection of the Authorization token
- Global error handling (e.g., handling 401 Unauthorized)

## Folder Structure
- `src/app/`: Next.js App Router pages.
- `src/components/`: Reusable UI components.
- `src/hooks/`: React Query custom hooks.
- `src/services/`: API communication logic.
- `src/store/`: Zustand state stores.
