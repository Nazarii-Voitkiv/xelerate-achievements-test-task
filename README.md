# XELERATE Achievements Module

This project implements the "Achievements" module as part of a test assignment, focusing on responsive design, clean code, and internationalization.

## Features

-   **Responsive Layout:** Adapts seamlessly across Desktop (≥ 1200px), Tablet (768–1199px), and Mobile (≤ 767px) breakpoints, adhering to the provided Figma design.
-   **Internationalization (i18n):** Supports multiple languages (Ukrainian and English) with easily manageable translations for all text content.
-   **Modular SCSS Styling:** Utilizes SCSS with modular styles (`.module.scss`) and variables for consistent theming.
-   **Semantic HTML:** Employs semantic HTML tags for improved accessibility and structure.
-   **Achievement Data Management:** Achievements data is stored in a separate, typed file.
-   **Dynamic Progress Tracking:** Features an achievement counter and a progress bar.
-   **Reusable Components:** Built with a focus on creating reusable and strictly typed React components.

## Technologies Used

-   [Next.js](https://nextjs.org/) (v15)
-   [TypeScript](https://www.typescriptlang.org/)
-   [SCSS](https://sass-lang.com/)
-   [React](https://react.dev/)

## Setup and Installation

To get this project up and running on your local machine, follow these steps:

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run the development server:**
    ```bash
    npm run dev
    ```

    The application will be accessible at `http://localhost:3000`.

## Usage

Upon running the development server, the application will automatically redirect from `http://localhost:3000/` to the default Ukrainian locale at `http://localhost:3000/ua`.

You can switch between languages by navigating to:

-   **Ukrainian:** `http://localhost:3000/ua`
-   **English:** `http://localhost:3000/en`

## Project Structure

Key directories and files:

-   `src/app/`: Contains the main application pages and root layout. The default (Ukrainian) locale pages are directly under `app/`, while other locales (e.g., English) are under `app/[locale]/`.
-   `src/components/`: Houses all reusable React components, organized by feature or category.
    -   `src/components/AchievementCard/`: Individual achievement card component.
    -   `src/components/Achievements/`: Main achievements module component.
    -   `src/components/PlatformSection/`: Section displaying platform-specific achievements.
    -   `src/components/SpecialistSection/`: Section displaying specialist-specific achievements.
    -   `src/components/ui/Portal/`: Reusable Portal component.
-   `src/data/`: Stores static data, including achievement definitions (`achievements.ts`) and translation dictionaries (`translations.ts`).
-   `src/hooks/`: Contains custom React hooks, such as `useTranslation` for i18n.
-   `src/styles/`: Global SCSS variables and mixins.
-   `src/types/`: TypeScript type definitions, including `achievements.ts` and `i18n.ts`.
-   `middleware.ts`: Next.js middleware for handling locale redirects and rewrites.
-   `next.config.ts`: Next.js configuration file.
-   `eslint.config.mjs`: ESLint configuration for code quality.