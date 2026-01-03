
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

The project uses **Jest** as its primary testing framework. Tests are located in the `src/tests` directory to keep the codebase organized.

### 1. Environment Configuration
Before running any tests, you must configure the test environment variables. The project uses a dedicated `.env.test` file to ensure tests do not interfere with your development database.

**File:** `.env.test`
```bash
# Database configuration
# IMPORTANT: This must point to a separate database (e.g., vira_test)
DATABASE_URL="postgresql://postgres:dev123@localhost:5432/vira_test?schema=public"
NODE_ENV=test
```

### 2. Database Migration (Run First)
You **must** run the test migration command before running the test suite. This ensures your test database has the correct tables and schema.

**Command:**
```bash
npm run prisma:migrate:test
```

### 3. Running All Tests
Once the database is ready, you can run the full test suite.

**Command:**
```bash
npm test
```

### 4. Running Tests Manually
Because tests are located in `src/tests`, you can use Jest directly to run specific files or folders. This is useful when working on a specific feature (like Booking or Security) and you don't want to wait for the whole suite.

**Syntax:** `npx jest <path-to-file>`

**Examples:**
```bash
# Run a specific test file
npx jest src/tests/booking/rules.test.ts

# Run all tests inside the security folder
npx jest src/tests/security

# Run tests matching a specific name pattern
npx jest -t "Helmet"
```

### 5. Test Structure & Files
Based on the project structure (shown in `src/tests`), here is the role of the helper files:

*   **`setup.ts`**: Global configuration that runs before tests start (e.g., initializing environment variables or mocking global objects).
*   **`prisma.ts`**: A dedicated Prisma client instance for testing. This usually handles connecting/disconnecting or cleaning the database between tests.
*   **`env.ts`**: validates that the `NODE_ENV` is set to 'test' so you don't accidentally wipe your production database.

### Developer Tips
*   **Watch Mode:** To automatically re-run tests whenever you save a file:
    ```bash
    npm test -- --watch
    ```

---

## Background Workers & Redis

This project relies heavily on background processing to handle time-sensitive tasks and real-time communication. You must have a Redis instance running for the application to function correctly.

### Architecture & Use Cases

We utilize **Redis** combined with **BullMQ** to handle complex asynchronous flows:

1.  **Booking Lifecycle (BullMQ):**
    *   We use BullMQ to schedule jobs that manage the state of bookings automatically.
    *   **Automatic Expiration:** If a booking remains "Pending" past a specific timeframe, a background worker automatically marks it as "Expired."
    *   **Activation:** Workers trigger status changes to "Active" when the scheduled start time arrives.

2.  **Real-Time Events (Redis Pub/Sub):**
    *   We utilize Redis Pub/Sub (Publish/Subscribe) for internal server communication.
    *   This architecture allows the backend services to decouple and emit **Real-Time Events** to connected clients (e.g., updating the UI immediately when a booking status changes).

### 1. Prerequisites: Install Redis

Redis is **mandatory**. The project is configured to use the official Redis Docker image, but you can also install it manually.

#### Option A: Docker (Recommended)
This project is designed to run with the standard Redis Docker image. This ensures you have the exact environment expected by the code.

**Run Redis container:**
```bash
# Pull and run the latest redis image on port 6379
docker run -d --name vira-redis -p 6379:6379 redis
```

#### Option B: Manual Installation
If you cannot use Docker, you must install Redis directly on your OS:
*   **Mac:** `brew install redis`
*   **Linux:** `sudo apt-get install redis-server`
*   **Windows:** Use WSL2 or download the Windows installer.

### 2. Starting the Workers

The workers run in a separate process from the main API application. You typically need to open a new terminal window to keep them running alongside your server.

**Command:**
```bash
npm run workers
```

> **Note:** Ensure your `.env` file contains the correct Redis connection details (usually `REDIS_HOST=localhost` and `REDIS_PORT=6379`) before starting the workers.

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