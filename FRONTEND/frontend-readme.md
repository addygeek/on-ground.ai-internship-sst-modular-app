# Frontend — React + TypeScript

Lightweight frontend for the Intern NLP project. Built with React, TypeScript, React Router, TanStack Query and custom UI components (Toaster, Sonner, TooltipProvider). Provides pages for Index, Recording and a 404 page.

## Prerequisites
- Node.js 18+ (LTS recommended)
- npm (or yarn / pnpm)
- Windows 10/11 (commands below use PowerShell / CMD)

## Install

PowerShell:
```powershell
cd "d:\PROGRAMING\7th sem 7\Intern NLP proejct\FRONTEND"
npm install
```

CMD:
```cmd
cd "d:\PROGRAMING\7th sem 7\Intern NLP proejct\FRONTEND"
npm install
```

If using yarn:
```bash
yarn
```

## Available scripts
- npm run dev — start development server
- npm run build — create production build
- npm run preview — preview production build locally
(Use the project's package.json scripts; replace with yarn or pnpm if used.)

Example (PowerShell):
```powershell
npm run dev
```

## Dev server
Open http://localhost:5173 (or the URL printed by the dev server). The app uses React Router; routes mounted by App.tsx:

- /         -> Index page
- /recording -> Recording page
- *         -> NotFound (catch-all)

## Key files / structure
- src/App.tsx — root app, providers and routes (uses QueryClientProvider, TooltipProvider, Toasters, Navbar)
- src/pages/Index.tsx — landing / main page
- src/pages/Recording.tsx — recording UI and logic
- src/pages/NotFound.tsx — 404
- src/components/Navbar.tsx — top navigation
- src/components/ui/* — UI primitives (Toaster, Sonner, Tooltip)
- src/main.tsx — app bootstrap (if present)
- package.json — dependencies and scripts
- tsconfig.json — TypeScript config
- public/ — static assets

## Notes about App.tsx
- React Query: QueryClientProvider wraps the app for server-state caching.
- UI providers: TooltipProvider and two toaster components are mounted globally.
- BrowserRouter is used for client-side routing; add new routes in App.tsx above the catch-all route.

## Environment / Backend connection
- If the frontend talks to the backend, set base API URL using environment variables (e.g., VITE_API_URL or REACT_APP_API_URL depending on the build setup).
- Example .env (Vite):
  VITE_API_URL=http://localhost:8000

After editing .env, restart the dev server.

## Recording page notes
- Recording likely uses browser audio APIs. Ensure microphone permission is granted.
- If integrating with the Python backend (vosk), run the backend server and ensure CORS and API endpoints are configured.

## Troubleshooting
- "Module not found" — run npm install and confirm file paths / exports.
- Type errors — run tsc or check editor diagnostics.
- Dev server on a different port — check printed URL in terminal.
- Microphone/Permissions — allow microphone access in Windows and browser.

## Building & Deploy
- npm run build to produce static assets in the configured output folder (usually `dist`).
- Serve with any static server or deploy to Netlify / Vercel / static host.

## Contributing
- Add routes in src/App.tsx above the "*" catch-all.
- Keep UI providers (Toaster, Sonner, TooltipProvider) at the root to ensure consistent behavior.
- Add tests alongside components and run the project's test runner (if configured).

## License
Project-level license applies. Adapt as needed.

```// filepath: d:\PROGRAMING\7th sem 7\Intern NLP proejct\FRONTEND\README.md

# Frontend — React + TypeScript

Lightweight frontend for the Intern NLP project. Built with React, TypeScript, React Router, TanStack Query and custom UI components (Toaster, Sonner, TooltipProvider). Provides pages for Index, Recording and a 404 page.

## Prerequisites
- Node.js 18+ (LTS recommended)
- npm (or yarn / pnpm)
- Windows 10/11 (commands below use PowerShell / CMD)

## Install

PowerShell:
```powershell
cd "d:\PROGRAMING\7th sem 7\Intern NLP proejct\FRONTEND"
npm install
```

CMD:
```cmd
cd "d:\PROGRAMING\7th sem 7\Intern NLP proejct\FRONTEND"
npm install
```

If using yarn:
```bash
yarn
```

## Available scripts
- npm run dev — start development server
- npm run build — create production build
- npm run preview — preview production build locally
(Use the project's package.json scripts; replace with yarn or pnpm if used.)

Example (PowerShell):
```powershell
npm run dev
```

## Dev server
Open http://localhost:5173 (or the URL printed by the dev server). The app uses React Router; routes mounted by App.tsx:

- /         -> Index page
- /recording -> Recording page
- *         -> NotFound (catch-all)

## Key files / structure
- src/App.tsx — root app, providers and routes (uses QueryClientProvider, TooltipProvider, Toasters, Navbar)
- src/pages/Index.tsx — landing / main page
- src/pages/Recording.tsx — recording UI and logic
- src/pages/NotFound.tsx — 404
- src/components/Navbar.tsx — top navigation
- src/components/ui/* — UI primitives (Toaster, Sonner, Tooltip)
- src/main.tsx — app bootstrap (if present)
- package.json — dependencies and scripts
- tsconfig.json — TypeScript config
- public/ — static assets

## Notes about App.tsx
- React Query: QueryClientProvider wraps the app for server-state caching.
- UI providers: TooltipProvider and two toaster components are mounted globally.
- BrowserRouter is used for client-side routing; add new routes in App.tsx above the catch-all route.

## Environment / Backend connection
- If the frontend talks to the backend, set base API URL using environment variables (e.g., VITE_API_URL or REACT_APP_API_URL depending on the build setup).
- Example .env (Vite):
  VITE_API_URL=http://localhost:8000

After editing .env, restart the dev server.

## Recording page notes
- Recording likely uses browser audio APIs. Ensure microphone permission is granted.
- If integrating with the Python backend (vosk), run the backend server and ensure CORS and API endpoints are configured.

## Troubleshooting
- "Module not found" — run npm install and confirm file paths / exports.
- Type errors — run tsc or check editor diagnostics.
- Dev server on a different port — check printed URL in terminal.
- Microphone/Permissions — allow microphone access in Windows and browser.

## Building & Deploy
- npm run build to produce static assets in the configured output folder (usually `dist`).
- Serve with any static server or deploy to Netlify / Vercel / static host.

## Contributing
- Add routes in src/App.tsx above the "*" catch-all.
- Keep UI providers (Toaster, Sonner, TooltipProvider) at the root to ensure consistent behavior.
- Add tests alongside components and run the project's test runner (if configured).

## License
Project-level license applies. Adapt as needed.
