# Task - Assigmnet

Project Description: Task Assignment Manager

This application allows users to manage tasks, assign them to individuals, and track their progress. It includes user authentication to secure the data and ensure that only authorized users can access and modify tasks.

## Features

- **User Authentication:**

  - Signup: Users can create new accounts by providing a username, email, and password. Password hashing is essential for security.
  - Login: Users can log in to their accounts using their credentials. Session management (e.g., JWT - JSON Web Tokens) is used to maintain user sessions.
  - Logout: Users can log out of their accounts.

- **Task Management (CRUD):**
  - Create Task: Authorized users can create new tasks, specifying a title, description, start date, end date and status.
  - Read Tasks: Users can view a list of all tasks, optionally filtered by assigned status (e.g., pending, in progress, completed)
  - Update Task: Authorized users can modify existing tasks, changing the title, description, start date, end date and status.
  - Delete Task: Authorized users can delete tasks. Confirmation before deletion is a good practice.

## Technology Stack

- **Frontend:** React - For building the user interface.
- **Backend:** Node.js with Express - For handling API requests and business logic.
- **Database:** MongoDB - For storing user and task data.
- **Authentication:** JWT (JSON Web Tokens) - For secure session management.

## Database Schema

**users table:**

- `id` (UUID, primary key) - A unique identifier for each user.
- `name` (VARCHAR) - The user's full name.
- `email` (VARCHAR, unique) - The user's email address (unique).
- `mobileNumber` (VARCHAR) - The user's mobile phone number.
- `password` (VARCHAR, hashed) - The user's password (securely hashed).
- `country` (VARCHAR) - The user's country.
- `city` (VARCHAR) - The user's city.
- `state` (VARCHAR) - The user's state.
- `gender` (ENUM or VARCHAR) - The user's gender. Values can be "Male", "Female", or "Other".

**tasks table:**

- `id` (UUID, primary key) - A unique identifier for each task.
- `taskName` (VARCHAR) - The name of the task.
- `userId` (UUID, foreign key referencing users.id) - The ID of the user who created the task. This establishes the relationship between tasks and users.
- `title` (VARCHAR) - A short title for the task.
- `description` (TEXT, nullable) - A more detailed description of the task (can be null or empty).
- `startDate` (DATE, nullable) - The start date of the task (can be null).
- `endDate` (DATE, nullable) - The end date or due date of the task (can be null).
- `totalTasks` (INTEGER) - The total number .
- `status` (ENUM or VARCHAR) - The status of the task. the values ("pending", "in-progress", "completed")

## API Endpoints

**Authentication:**

- `POST /register` - Create a new user.
- `POST /login` - Log in a user.

**Tasks:**

- `GET /tasks` - Get a specific task by the user.
- `POST /tasks` - Create a new task.
- `PUT /tasks/:taskId` - Update a task.
- `DELETE /tasks/:taskId` - Delete a task.

## Pages

- Sign-up: [http://localhost:3000/signup](http://localhost:3000/signup)
- Login: [http://localhost:3000/login](http://localhost:3000/login)
- Task: [http://localhost:3000/](http://localhost:3000/)

## Environment Variables

**app:**

- `DB_URI`: MongoDB database connection string.
- `ACCESS_TOKEN_SECRET`: A secret string for refreshing tokens.
- `PORT`: The port your server will run on.

Example `.env` file:

**storefront:**

- `NEXT_PUBLIC_API_URL`:Backend server url.

Example `.env.local` file:

## Run Commands

- app: Run the backend server with npm `npm run dev`
- storefront: Run the frontend server with `npm run dev`
