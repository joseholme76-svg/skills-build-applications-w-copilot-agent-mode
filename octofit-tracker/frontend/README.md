# Octofit Tracker frontend

The React 19 presentation tier is built with Vite and uses React Router for
navigation. Its API client calls the Octofit backend on port 8000.

## Configure the backend URL

Define `VITE_CODESPACE_NAME` in `.env.local` when running the frontend in GitHub
Codespaces. Vite uses it to call
`https://<VITE_CODESPACE_NAME>-8000.app.github.dev`.

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

For local development, the variable is optional: when it is unset, API requests
use `http://localhost:8000`. Restart the Vite server after changing `.env.local`.

## Run the frontend

```bash
npm run dev
```
