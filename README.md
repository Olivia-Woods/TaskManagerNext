# Task Manager

## Overview

A full-stack task management application built with **Next.js** for the frontend and backend, using **MongoDB** and **Mongoose** for data storage. This app allows users to add, prioritise, complete, and delete tasks dynamically.

## Features

- **Task Management**: Add, complete, prioritise, and delete tasks.
- **Next.js API Routes**: A serverless backend using Next.js API routes.
- **Responsive Design**: Modern, user-friendly interface.
- **MongoDB Database**: Data is stored persistently using MongoDB.
- **CRUD Operations**: Full support for creating, reading, updating, and deleting tasks.

## Technologies Used

### **Frontend & Backend (Full Stack with Next.js)**

- **Next.js** (App Router, API Routes)
- **React** (Hooks like `useState`, `useEffect`)
- **CSS Modules** for styling

### **Database & Backend Integration**

- **MongoDB** (NoSQL database)
- **Mongoose** (ODM for MongoDB)
- **Next.js API Routes** for backend logic

## Setup Instructions

### Prerequisites:

- Node.js and npm installed
- MongoDB Atlas or a local MongoDB instance

### Steps:

1. **Clone the repository:**

   ```sh
   git clone <repository-url>
   ```

2. **Navigate to the project directory:**

   ```sh
   cd TaskNext
   ```

3. **Install dependencies:**

   ```sh
   npm install
   ```

4. **Set up MongoDB connection:**

   - Create a `.env.local` file in the root of the project.
   - Add the following line, replacing `<your-mongo-uri>` with your actual MongoDB URI:
     ```sh
     MONGODB_URI=<your-mongo-uri>
     ```

5. **Start the Next.js application:**
   ```sh
   npm run dev
   ```
   - The app runs at `http://localhost:3000/tasks`.

## API Endpoints

| Method | Endpoint     | Description             |
| ------ | ------------ | ----------------------- |
| GET    | `/api/tasks` | Fetch all tasks.        |
| POST   | `/api/tasks` | Add a new task.         |
| PUT    | `/api/tasks` | Update a task.          |
| DELETE | `/api/tasks` | Delete a specific task. |

## Example API Usage with cURL

1. **GET `/api/tasks`** - Fetch all tasks:

   ```sh
   curl http://localhost:3000/api/tasks
   ```

2. **POST `/api/tasks`** - Add a new task:

   ```sh
   curl -X POST http://localhost:3000/api/tasks \
   -H "Content-Type: application/json" \
   -d '{"content": "Test Task", "completed": false, "isPriority": false}'
   ```

3. **PUT `/api/tasks`** - Update a task (replace `<id>` with a valid task ID):

   ```sh
   curl -X PUT http://localhost:3000/api/tasks \
   -H "Content-Type: application/json" \
   -d '{"id": "<id>", "completed": true, "isPriority": true}'
   ```

4. **DELETE `/api/tasks`** - Delete a task (replace `<id>` with a valid task ID):
   ```sh
   curl -X DELETE "http://localhost:3000/api/tasks?id=<id>"
   ```

## Known Issues and Future Enhancements

- **Option to Edit Tasks**: Allow users to modify existing tasks.
- **Drag and Drop Feature**: Enable users to reorder tasks using a drag-and-drop interface (similar to the React version).
- **Better UI**: Improve the overall design and user experience with enhanced styling and layout.

## Acknowledgments

- Built as part of IOD course!
