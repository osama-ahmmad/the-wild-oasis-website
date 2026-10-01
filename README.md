# The Wild Oasis

The Wild Oasis is a modern cabin reservation platform for a family-run retreat in the Italian Dolomites. Guests can explore cabins, check availability, choose travel dates, create reservations, and manage their profile and upcoming stays.

Built with the Next.js App Router, Supabase, NextAuth, and Tailwind CSS.

## Highlights

- Browse cabins with capacity and pricing filters
- View cabin details, availability, and nightly pricing
- Select a date range with booked dates disabled
- Create and manage reservations
- Sign in securely with Google
- Update guest profile and nationality details
- Responsive interface for desktop and mobile screens
- Server Actions for reservation and profile mutations

## Tech Stack

- **Framework:** Next.js 14 with the App Router
- **UI:** React 18 and Tailwind CSS
- **Database:** Supabase
- **Authentication:** NextAuth with Google OAuth
- **Date selection:** React Day Picker and date-fns
- **Icons:** Heroicons
- **Deployment:** Vercel-ready

## Requirements

- Node.js 18.17 or newer
- npm
- A Supabase project
- A Google OAuth application

## Getting Started

1. Clone the repository and enter the project directory:

   ```bash
   git clone <repository-url>
   cd the-wild-oasis-website
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a local environment file:

   ```bash
   copy .env.example .env.local
   ```

   On macOS or Linux, use:

   ```bash
   cp .env.example .env.local
   ```

4. Add your credentials to `.env.local`:

   ```env
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_KEY=your-supabase-key
   AUTH_GOOGLE_ID=your-google-client-id
   AUTH_GOOGLE_SECRET=your-google-client-secret
   ```

   Keep `.env.local` private. It is ignored by Git.

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command         | Description                        |
| --------------- | ---------------------------------- |
| `npm run dev`   | Start the development server       |
| `npm run lint`  | Run Next.js ESLint checks          |
| `npm run build` | Create a production build          |
| `npm run start` | Serve the production build locally |

## Project Structure

```text
app/
├── _components/        Reusable UI and booking components
├── _lib/               Auth, Supabase, data, and server actions
├── _styles/            Global Tailwind and calendar styles
├── account/            Guest profile and reservation management
├── cabins/             Cabin listing, detail, and booking routes
├── login/              Google sign-in flow
└── page.js             Homepage
public/                 Images and static assets
starter/                Course starter examples
```

## Data And Authentication

The application reads cabin, guest, booking, and settings data from Supabase. Google sign-in is handled by NextAuth. During sign-in, a guest record is created automatically when a matching guest does not already exist.

Before running the application, make sure your Supabase project contains the tables and data expected by the data service, including cabins, guests, bookings, and settings.

## Deployment

The app can be deployed to Vercel:

1. Import the repository into Vercel.
2. Add the same environment variables from `.env.local` to the Vercel project settings.
3. Add the deployed domain to the Google OAuth authorized origins and redirect URLs.
4. Deploy using the default Next.js build settings.

For a production deployment, verify Supabase row-level security policies and OAuth redirect URLs before inviting guests to use the application.

## License

This project is private and intended for learning and portfolio use.
