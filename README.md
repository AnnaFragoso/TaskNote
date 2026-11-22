
# Task Management

A simple task management application that allows users to create, view, edit, and delete tasks.

## Features

- Create, edit, and delete tasks.
- View tasks in a paginated list.
- Automatically load more tasks when scrolling.
- Form validation.
- Loading, error, and success feedback.

## Tech Stack

- **Next.js** – Application framework.
- **React** – UI components.
- **TypeScript** – Type safety.
- **tRPC** – Type-safe communication between frontend and backend.
- **TanStack Query** – Server state, caching, mutations, and infinite queries.
- **React Hook Form** – Form state management and validation.
- **Zod** – Input validation.
- **Material UI** – UI components.

## Architecture

The application follows a layered structure:

- **Router:** Defines API procedures and validates inputs.
- **Service:** Coordinates operations and handles application-level errors.
- **Repository:** Manages task data using an in-memory array.
- **Components:** Handle the user interface and interactions.
- **Hooks:** Encapsulate form logic and task operations.

Tasks are stored in memory and are not persisted. Data is reset when the server restarts.

## Getting Started

### Requirements

- Node.js
- npm

### Installation

Clone the repository:

```bash
git clone <repository-url>
cd <project-folder>
```

Install dependencies:

```bash
npm install
```

### Run the application

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)/tasks in your browser.
