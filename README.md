# E-Commerce Dashboard

This is a modern E-Commerce Admin Dashboard built with React, Zustand, and React Query. It allows you to manage products.

## Features

* Product management (Add, Edit, Delete, Read)
* Search by title or brand
* Pagination with infinite scroll
* Zustand state management
* React Query for data fetching

## Installation

Clone the repository:

```bash
git clone <your-repo-url>
cd <your-project-folder>
```

Install dependencies:

```bash
npm install
```

## Running Locally

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port Vite assigns).

## Building for Production

To create a production build:

```bash
npm run build
```

The production-ready files will be generated in the `dist` folder.

## Notes

* No Redux is used; state is managed with Zustand.
* Only the provided APIs are used; no custom backend.
* Mock authentication only; no authentication libraries used.

## License

MIT
