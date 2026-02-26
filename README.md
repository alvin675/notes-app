# Notes App
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/alvin675/notes-app)

A full-stack note-taking application built with a React frontend and a Laravel backend. This application allows users to register, log in, and manage their personal to-do lists through a clean and responsive user interface.

## Table of Contents
- [Project Structure](#project-structure)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

  
## Project Structure

The repository is organized into two main directories, separating the frontend and backend concerns:

-   `Frontend-React/notes-app/`: Contains the React application built with Vite.
-   `Backend-laravel/todoApp/`: Contains the Laravel API that serves the data.

## Features

-   **User Authentication**: Secure user registration and login functionality using a custom JSON Web Token (JWT) implementation.
-   **Full CRUD for Notes**: Create, read, update, and delete notes.
-   **Note Attributes**: Each note includes a title, description, due date, and can be categorized by:
    -   **Priority**: Low, Medium, High, Urgent, Immediate
    -   **Status**: Pending, In Progress, Completed, On Hold, Canceled
    -   **Category**: Work, Personal, Shopping, Health, Finance
-   **Search Functionality**: Filter and find notes by title.
-   **Interactive UI**: A modal-based interface for creating and editing notes without leaving the main view.

## Tech Stack

-   **Backend**:
    -   PHP
    -   [Laravel](https://laravel.com/)
    -   MySQL
-   **Frontend**:
    -   [React](https://react.dev/)
    -   [Vite](https://vitejs.dev/)
    -   [Tailwind CSS](https://tailwindcss.com/)
    -   [Axios](https://axios-http.com/) for API requests

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:
-   PHP >= 8.2
-   Composer
-   Node.js and npm

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/alvin675/notes-app.git
cd notes-app
```

### 2. Backend Setup (Laravel)

Navigate to the backend directory and follow these steps:

```bash
# Go to the backend directory
cd Backend-laravel/todoApp

# Install PHP dependencies
composer install

# Create a copy of the .env.example file
cp .env.example .env

# Generate an application key
php artisan key:generate

# Create the MySQL database file
create database <database name>;

# Run database migrations and seed the database with initial data
# This will create the necessary tables and populate them with users, categories, etc.
php artisan migrate --seed

# For re-running the database again from the starting
php artisan migrate:fresh --seed

# Start the Laravel development server (defaults to http://127.0.0.1:8000)
php artisan serve
```
> **Note:** The seeder creates a default admin user with the credentials:
> - **Email**: `admin@gmail.com`
> - **Password**: `admin123`

### 3. Frontend Setup (React)

Open a new terminal, navigate to the frontend directory, and follow these steps:

```bash
# Go to the frontend directory from the root
cd Frontend-React/notes-app

# Install JavaScript dependencies
npm install

# Start the Vite development server (defaults to http://localhost:5173)
npm run dev
```

After completing these steps, open your browser and navigate to the address provided by the Vite server (e.g., `http://localhost:5173`) to use the application.

## API Endpoints

The Laravel backend provides the following API endpoints, all prefixed with `/api`.

| Method  | Endpoint         | Description                                  | Protected |
| :------ | :--------------- | :------------------------------------------- | :-------- |
| `POST`  | `/register`      | Register a new user.                         | No        |
| `POST`  | `/login`         | Log in a user and receive a JWT.             | No        |
| `GET`   | `/todo`          | Get all to-do items for the authenticated user. | Yes       |
| `GET`   | `/todo/{id}`     | Get a single to-do item by its ID.           | Yes       |
| `POST`  | `/todo`          | Create a new to-do item.                     | Yes       |
| `PUT`   | `/todo/{id}`     | Update an existing to-do item by its ID.     | Yes       |
| `DELETE`| `/todo/{id}`     | Delete a to-do item by its ID.               | Yes       |
