
# Vira Backend API Documentation

## Overview
This backend provides REST APIs for the system including authentication,
user management, bookings, admin operations, and dashboard statistics.

- Tech Stack: Node.js, Express, TypeScript
- Database: PostgreSQL
- ORM: Prisma
- Auth: JWT
- Validation: Zod

---

## Table of Contents
- Architecture
- Project Structure
- Environment Setup
- Running the Project
- Authentication
- Authorization & Roles
- API Response Format
- Error Handling
- Validation
- Database & Prisma
- Seeding
- Testing
- Deployment Notes

---

## Architecture

The backend follows a **Feature-Based Architecture**.

Each feature contains:
- routes
- controllers
- services
- validators
- tests



src/
packages/
auth/
user/
booking/
place/
dashboard/


---

## Project Structure



```
src/
├── core/
│ ├── config/
│ ├── middlewares/
│ ├── prisma/
│ └── utils/
├── packages/
│ ├── auth/
│ ├── user/
│ ├── regions/
│ └── place/
├── lib/
│ ├── api_error.ts
│ ├── error_codes.ts
│ └── status_codes.ts
└── server.ts
└── app.ts
```


---

## Environment Setup

Create a `.env` file:

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/db
JWT_SECRET=your_secret

Running the Project
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

---

## Authentication

Authentication is based on JWT (JSON Web Tokens).

### Login Flow
1.  User submits their credentials (e.g., email and password).
2.  The server validates these credentials against the database.
3.  Upon successful validation, the server issues a JWT.
4.  The client must send this token in the `Authorization` header for all subsequent protected requests.

**Example Header:**
```
Authorization: <token>
```

---

## Authorization & Roles

The system utilizes a role-based access control system to manage permissions.

```typescript
enum UserRole {
  ADMIN,
  SUPER_ADMIN
  USER
}
```

-   **`SUPER_ADMIN`**: Has full access to all administrative panels, management endpoints, and can perform all administrative tasks.
-   **`ADMIN`**: Has full access to all administrative panels and management endpoints.
-   **`USER`**: Has standard access to the application's primary features.
-

Authorization is enforced globally via middleware, which checks the user's role and permissions before allowing access to a route.

---

## API Response Format

All API responses follow a consistent JSON structure to ensure predictability.

### Success Response

For successful requests (`2xx` status codes):

```json
{
  "success": true,
  "data": {
    "userId": 1,
    "name": "John Doe"
  }
}
```

### Error Response

For failed requests (`4xx` or `5xx` status codes):

```json
{
  "success": false,
  "error": {
    "message": "Validation failed",
    "code": "VALIDATION_ERROR",
    "errors": {
      "name": ["Name is required"]
    }
  }
}
```
---

## Error Handling

-   All errors are intercepted and processed by a global error-handling middleware.
-   A custom `ApiError` class is used to generate consistent, structured error responses.
-   The system uses clear, predefined error codes (e.g., `VALIDATION_ERROR`, `NOT_FOUND`).
-   Proper HTTP status codes are always returned to reflect the nature of the error.

---

## Validation

Request body, query, and parameter validation is performed using **Zod**.

-   Each route has an associated validation schema.
-   Middleware like `validateSchema(createPlaceSchema)` is used to enforce these schemas.
-   Requests that fail validation are rejected with a `400 BAD REQUEST` status and a detailed error response.

---

## Database & Prisma

-   **PostgreSQL** serves as the primary relational database.
-   **Prisma** is used as the ORM for database schema management, migrations, and type-safe queries.

**Common Commands:**
```bash
# Apply pending database migrations
npm run db:migrate

# Generate the Prisma Client
npm run db:generate
```

---

## Seeding

The project includes seeders to populate the database with initial data for development and testing purposes.

**Command:**
```bash
# Run all seeders
npm run db:seed
```

---

## Testing

-   The project uses **Jest** as its primary testing framework.
-   Test files are located alongside the features they are testing for better organization and maintainability.

**Command:**
```bash
# Run all tests
npm test
```

---

## Deployment Notes

To prepare the application for a production environment:

```bash
# 1. Build the TypeScript source code
npm run build

# 2. Run the compiled JavaScript output
node dist/server.js
```
**Important:** Ensure all required environment variables (as defined in the `.env` file) are correctly set in the production environment.