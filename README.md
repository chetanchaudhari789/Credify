# Credit Card Comparison Web App - India

## Project Overview
This web application helps users explore and discover the best credit card offers across major Indian banks. It features a modern, AI-enhanced interface that allows users to ask natural language queries such as:

- "Show me cards that offer lounge access and high cashback on fuel"
- "Best credit cards for first-time users with no annual fee"
- "Compare Axis Magnus vs HDFC Regalia with benefits summary"

The app leverages a Large Language Model (LLM) like OpenAI or Gemini to enhance the discovery experience through chat or search interfaces.

## Key Features
- Comprehensive credit card data sourced from scraping, mock datasets, or APIs.
- Smart data structuring for efficient search and comparison.
- Natural language query interface powered by an LLM.
- Detailed credit card benefits and offer summaries.
- Bonus features:
  - Price and offer history visualization.
  - Bank-specific benefits clearly highlighted.
  - LLM-generated short summaries for each credit card.

## Technologies Used
- React with TypeScript for the frontend UI.
- Vite as the build tool and development server.
- Tailwind CSS for styling.
- Radix UI components for accessible and customizable UI elements.
- Integration with OpenAI/Gemini API for natural language processing.
- Additional libraries for data handling, routing, and state management.

## Getting Started

### Prerequisites
- Node.js (version 16 or higher recommended)
- npm (comes with Node.js)

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd card-whisperer-india-main
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Development Server
Start the development server with:
```bash
npm run dev
```
Access the app at [http://localhost:8080](http://localhost:8080).

### Building for Production
Build the app for production with:
```bash
npm run build
```
The output will be in the `dist` directory.

### Preview Production Build
Preview the production build locally with:
```bash
npm run preview
```

## Project Structure
- `src/` - Source code including components, pages, hooks, and styles.
- `public/` - Static assets.
- `vite.config.ts` - Vite configuration.
- `package.json` - Project metadata and dependencies.

