# Anima Project

A React project migrated from Vite to Next.js.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## About the Migration

This project has been migrated from Vite to Next.js. The main changes include:

- Replacing React Router with Next.js App Router
- Using Next.js page structure for routes
- Converting client-side state routing to use localStorage for passing data between pages
- Configuring Next.js, PostCSS, and Tailwind appropriately

## Project Structure

- `src/app/` - Next.js app directory with page routes
- `src/components/` - UI components
- `src/screens/` - Main screen components (kept for compatibility)
- `public/` - Static assets

## Built With

- Next.js
- React
- TailwindCSS
- ShadCN UI components
