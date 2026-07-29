# Bardify - Premium AI Shakespeare Translator

Bardify is a modern luxury AI SaaS application that effortlessly transforms your modern English into authentic Elizabethan poetry.

## Prerequisites

This application uses the official Google Gemini API (`@google/genai`) for text generation. 

Before running the application, you must configure your API key.

1. Obtain an API key from Google AI Studio.
2. Create a file named `.env` in the root of the project (next to `package.json`).
3. Add the following line to the `.env` file:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

## Running Locally

Once the `.env` file is set up, install the dependencies and start the development server:

```bash
npm install
npm run dev
```

The application will launch on your local host (typically `http://localhost:5173`).
