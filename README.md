# PixelTest App

PixelTest is a simple tool for composing, previewing, and sending HTML emails. It provides a live HTML editor, a preview mode, recipient management with validation, and visual feedback via toasts.

## Features
- Create and preview HTML emails (with Ace editor and live preview)
- Add up to 3 recipients with email validation (Zod)
- Success/error toasts and loading states (Sonner)
- SMTP send endpoint using Nodemailer
- Authentication scaffolding with Clerk (optional)
- Modern UI with Tailwind CSS, Framer Motion, and a shader background

## Tech Stack
- Next.js 15, React 19
- Tailwind CSS 4
- Zod (form validation)
- Sonner (toasts)
- Framer Motion (animations)
- react-ace (HTML editor)
- Nodemailer (SMTP)

## Getting Started

1) Install dependencies

```bash
npm install
```

2) Environment variables

Create a `.env.local` at the project root and add your SMTP credentials:

```env
SMTP_HOST=smtp.yourprovider.com
SMTP_PORT=587
SMTP_USER=your_user
SMTP_PASS=your_password
```

Optional (if you want to enable Clerk auth components):

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

3) Run the dev server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Usage
- Home page shows the hero section and header. If Clerk is configured, you will see the auth buttons.
- Go to `/create-email` to compose and preview your email:
  - Add up to 3 recipients
  - Fill in the subject
  - Write HTML in the editor or switch to Preview
  - Click “Enviar email de teste” to send via the `/api/send-email` endpoint
- You will see loading/success/error toasts during the send flow.

## API
POST `/api/send-email`

Body:
```json
{
  "to": ["recipient@example.com"],
  "subject": "Subject here",
  "html": "<h1>Hello</h1>"
}
```

Responses:
- 200: `{ message: "Email sent successfully!" }`
- 400: `{ error: "Missing required fields" }`
- 500: `{ error: "Failed to send email" }`

## Scripts
- `npm run dev`: start Next.js in development mode (Turbopack)
- `npm run build`: build the project
- `npm run start`: start the production server

## Folder Structure
- `src/app` – Next.js App Router pages and API routes
  - `api/send-email/route.ts` – Nodemailer endpoint
  - `create-email/page.tsx` – email composer page
- `src/components` – shared UI and layout components
- `src/components/ui` – design system primitives (e.g., Button)

## Deployment
1) Ensure environment variables are set in your hosting provider (SMTP and optional Clerk keys)
2) Build and start:

```bash
npm run build
npm run start
```

## Troubleshooting
- SMTP connection errors: verify `SMTP_HOST`, `SMTP_PORT` (465 for secure, otherwise 587/25), `SMTP_USER`, `SMTP_PASS`.
- Emails not delivered: check your SMTP provider’s dashboard/logs and sender domain configuration (SPF/DKIM).
- Auth UI not showing: add Clerk keys to `.env.local` and restart the dev server.

## License
This project is licensed under the MIT License.
