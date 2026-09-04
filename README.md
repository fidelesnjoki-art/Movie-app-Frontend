# Cinema

> Discover great films, save what you want to watch, and share the conversation.

Cinema is a responsive movie-community web app built with React. It combines movie discovery powered by TMDB with lightweight social features: profiles, reviews, comments, clubs, and a personal watchlist.

## Features

- **Discover movies** — browse trending and popular titles, search by name, and filter by genre.
- **Movie and TV details** — explore artwork, cast, director, runtime, ratings, and related community posts.
- **Personal watchlist** — add or remove titles; choices persist in the browser with local storage.
- **Community posts** — create reviews, like posts, and join the discussion in comments.
- **Clubs** — browse, create, and view movie clubs.
- **Profiles** — view and edit a local user profile.
- **Protected routes** — keep the core app behind the local sign-in flow.

## Built with

- [React](https://react.dev/) and [Vite](https://vite.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/) and React Redux for application state
- [React Router](https://reactrouter.com/) for navigation and protected routes
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [TMDB API](https://developer.themoviedb.org/docs/getting-started) for movie and TV data
- [Vitest](https://vitest.dev/) and ESLint for quality checks

## Getting started

### Prerequisites

- Node.js **20.19+** or **22.12+**
- A free [TMDB API key](https://developer.themoviedb.org/docs/getting-started)

### Installation

1. Clone the repository and open the frontend directory:

   ```bash
   git clone <repository-url>
   cd Movie-app-Frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and add your TMDB key:

   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   Vite prints the local URL in the terminal—usually `http://localhost:5173`.

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server with hot reload. |
| `npm run build` | Create an optimized production build in `dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Check JavaScript and JSX with ESLint. |
| `npm test` | Run the test suite once. |
| `npm run test:watch` | Run tests in watch mode during development. |

## Testing

The project includes focused unit tests for the Redux state that drives its core interactions:

- `authSlice` — signing in, signing out, and profile changes
- `postsSlice` — likes, new posts, and comments
- `moviesSlice` — genre selection and clearing search results

Run the test suite with:

```bash
npm test
```

Before opening a pull request, run the full local check:

```bash
npm test
npm run lint
npm run build
```

## Project structure

```text
src/
├── components/  # Reusable UI components, organized by feature
├── data/        # Seed data for local community content
├── features/    # Redux slices and their unit tests
├── pages/       # Route-level screens
├── routes/      # Route definitions and access protection
├── services/    # TMDB API client
└── store/       # Redux store configuration
```

## Data and authentication

Movie and TV information is fetched from TMDB. Authentication, profiles, clubs, and posts are currently local client-side state intended for demonstration; they are not connected to a backend or real user accounts. The watchlist is saved in browser local storage.

## TMDB attribution

This product uses the TMDB API but is not endorsed or certified by TMDB.
