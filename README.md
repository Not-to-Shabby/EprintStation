# E-Print Station Kiosk UI

A modern, touch-friendly kiosk interface for self-service printing, scanning, and photocopying, built with React, Vite, and Material UI (Material Design 3).

## Features
- Material Design 3 (Material You) UI
- Touch-friendly, modular screens for print, scan, and photocopy
- Modern navigation and responsive layout
- Contextual processing animations

## Prerequisites
- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Setup Instructions

1. **Install dependencies**

   ```pwsh
   npm install
   ```

2. **Start the development server**

   ```pwsh
   npm run dev
   ```
   The app will be available at the URL shown in the terminal (usually http://localhost:5173).

3. **Build for production**

   ```pwsh
   npm run build
   ```
   The output will be in the `dist/` folder.

4. **Preview the production build**

   ```pwsh
   npm run preview
   ```

5. **Lint the code**

   ```pwsh
   npm run lint
   ```

## Using the Makefile (optional)
If you have [Make](https://gnuwin32.sourceforge.net/packages/make.htm) installed, you can use these shortcuts:

- `make install` — Install dependencies
- `make develop` — Start the dev server
- `make build` — Build for production
- `make preview` — Preview production build
- `make lint` — Run ESLint

## Project Structure
- `src/` — Main source code
- `src/components/` — React components for each screen
- `public/` — Static assets
- `index.html` — App entry point
- `Makefile` — (Optional) Command shortcuts

## License
MIT
