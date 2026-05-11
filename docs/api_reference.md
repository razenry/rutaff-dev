# API Reference (v1)

Base URL: `http://localhost/api/v1`

## Authentication

### Register
`POST /register`
- Body: `name`, `email`, `password`, `password_confirmation`

### Login
`POST /login`
- Body: `email`, `password`
- Returns: `user` object and `access_token`

### Social Login (SSO)
`POST /social-login`
- Body: `email`, `name`, `social_id`, `social_type`
- Returns: `user` object and `access_token`

### Logout
`POST /logout` (Auth Required)

### Me (Profile)
`GET /me` (Auth Required)

## Articles

### List Articles
`GET /articles`

### Create Article
`POST /articles`
- Body: `title`, `content`

## Todos (Auth Required)

### List Todos
`GET /todos`

### Create Todo
`POST /todos`
- Body: `title`

### Update Todo
`PUT /todos/{id}`
- Body: `title`, `is_completed`

### Delete Todo
`DELETE /todos/{id}`
