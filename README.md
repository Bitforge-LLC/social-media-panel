# Template App Base - Next.js 15 Full-Stack Template

A production-ready Next.js 15 template with authentication, database, payments, and more. Auto-synced from the [mono-repo](https://github.com/TheeCryptoChad/mono-repo).

## ⚠️ Important Note

This repository is **automatically synced** from the mono-repo. **Do not make direct changes here** - they will be overwritten on the next sync.

**To modify this template:**

1. Clone the [mono-repo](https://github.com/TheeCryptoChad/mono-repo)
2. Edit files in `apps/template-app-base/`
3. Commit and push
4. Changes will automatically sync to this repository

## ✨ Features

### Core Stack

- **Next.js 15** - Latest App Router with React 19
- **TypeScript** - Full type safety
- **Tailwind CSS 4** - Utility-first CSS with modern features
- **Bun** - Fast JavaScript runtime and package manager

### Authentication & Authorization

- **NextAuth v5** - Flexible authentication
- **Multiple Providers** - GitHub, Vercel, Neon, etc.
- **Session Management** - Secure cookie-based sessions
- **Role-Based Access** - Middleware-based authorization

### Database

- **Prisma** - Type-safe database client
- **PostgreSQL** - Powered by Neon serverless
- **Zod Validation** - Generated schemas for type-safe validation
- **Migrations** - Automated schema synchronization

### Payments

- **Stripe** - Full payment integration
- **Checkout** - Pre-built checkout flows
- **Subscriptions** - Ready for SaaS billing

### API Layer

- **tRPC** - End-to-end type-safe APIs
- **React Query** - Powerful data fetching
- **SuperJSON** - Automatic serialization

### UI Components

- **HeroUI** - Beautiful React component library
- **Framer Motion** - Smooth animations
- **Theme Support** - Dark/light mode
- **Responsive** - Mobile-first design

### Developer Experience

- **Dev Tools** - Built-in development utilities
- **Hot Reload** - Instant feedback
- **Type Checking** - Compile-time safety
- **Linting** - ESLint with strict rules
- **Formatting** - Prettier with auto-format

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) v1.3.1 or higher
- [GitHub Personal Access Token](https://github.com/settings/tokens) with `read:packages` scope (for private packages)
- PostgreSQL database (recommended: [Neon](https://neon.tech))
- [Stripe Account](https://stripe.com) (optional, for payments)

### Installation

```bash
# Clone this repository
git clone https://github.com/TheeCryptoChad/template-app-base.git
cd template-app-base

# Set up GitHub Packages authentication
export GITHUB_TOKEN=your_github_personal_access_token

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env
# Edit .env with your actual values

# Sync database schema
bun run db:sync

# Generate Prisma client
bunx prisma generate

# Run database migrations
bunx prisma migrate dev --name init

# Start development server
bun run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Environment Variables

Create a `.env` file with the following variables:

```bash
# Database
DATABASE_URL="postgresql://..."

# Authentication
AUTH_URL="http://localhost:3000"
AUTH_SECRET="your-secret-here-min-32-chars"

# OAuth Providers (optional)
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."

# Stripe (optional)
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Email (optional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
SMTP_FROM="noreply@yourapp.com"
```

## 📁 Project Structure

```
template-app-base/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (public)/          # Public routes
│   │   │   ├── (auth)/        # Login, signup
│   │   │   ├── (legal)/       # Terms, privacy
│   │   │   └── home/          # Landing page
│   │   ├── (private)/         # Protected routes
│   │   ├── settings/          # User settings
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # NextAuth endpoints
│   │   │   └── trpc/          # tRPC endpoints
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # Reusable components
│   ├── lib/                   # Core libraries
│   │   ├── auth/             # Auth configuration
│   │   ├── db.ts             # Database client
│   │   ├── prisma/           # Prisma schemas
│   │   └── trpc/             # tRPC setup
│   ├── routers/              # tRPC routers
│   ├── providers/            # React providers
│   ├── config/               # App configuration
│   ├── env.ts                # Environment validation
│   └── middleware.ts         # Next.js middleware
├── public/                   # Static assets
├── .env.example             # Environment template
└── package.json             # Dependencies
```

## 🔧 Available Scripts

```bash
# Development
bun run dev          # Start dev server
bun run dev:turbo    # Start dev server with Turbopack

# Building
bun run build        # Build for production
bun run start        # Start production server

# Database
bun run db:sync      # Sync Prisma schemas
bun run db:reset     # Reset database and migrations
bun run db:update    # Update database schema
bun run db:view      # Open Prisma Studio

# Code Quality
bun run lint         # Run ESLint
bun run type-check   # TypeScript type checking
```

## 📦 Included Packages

All packages are published to GitHub Packages and automatically installed:

- **@Bitforge-LLC/auth** - Authentication logic and providers
- **@Bitforge-LLC/email** - Email templates and sending
- **@Bitforge-LLC/env-config** - Environment validation
- **@Bitforge-LLC/payment** - Stripe integration
- **@Bitforge-LLC/ui** - UI components
- **@Bitforge-LLC/devtools** - Development tools

## 🗄️ Database Schema

The template uses Prisma with PostgreSQL:

```prisma
// src/lib/db/schema.prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DATABASE_URL_UNPOOLED")
}

generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["driverAdapters"]
}

generator zod {
  provider               = "zod-prisma-types"
  output                 = "../zod"
  createInputTypes       = true
  createModelTypes       = true
  addInputTypeValidation = true
}
```

Edit the schema file directly at `src/lib/db/schema.prisma`. Zod schemas are auto-generated for type-safe validation.

## 🔐 Authentication

The template supports multiple authentication providers:

```typescript
// Configure in src/lib/auth/index.ts
import { GitHub, Credentials } from "@Bitforge-LLC/auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub,
    Credentials({
      // Custom login logic
    }),
  ],
});
```

## 🎨 Styling

The template uses Tailwind CSS 4 with HeroUI components:

```tsx
import { Button } from "@Bitforge-LLC/ui";

export function MyComponent() {
  return (
    <Button color="primary" variant="shadow">
      Click me
    </Button>
  );
}
```

## 🔄 API Routes with tRPC

Create type-safe API routes:

```typescript
// src/routers/user.ts
import { router, protectedProcedure } from "../lib/trpc/trpc";

export const userRouter = router({
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.user.findUnique({
      where: { id: ctx.session.user.id },
    });
  }),
});
```

Use in components:

```tsx
import { api } from "@/lib/trpc/client";

export function UserProfile() {
  const { data: profile } = api.user.getProfile.useQuery();
  return <div>{profile?.name}</div>;
}
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
bun add -g vercel

# Deploy
vercel
```

### Environment Variables in Production

Set the following in your deployment platform:

1. `DATABASE_URL` - PostgreSQL connection string
2. `AUTH_URL` - Your production URL
3. `AUTH_SECRET` - Generate with `openssl rand -base64 32`
4. `GITHUB_TOKEN` - For installing private packages
5. OAuth provider credentials (if using)
6. Stripe keys (if using payments)

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth Documentation](https://next-auth.js.org)
- [tRPC Documentation](https://trpc.io/docs)
- [HeroUI Documentation](https://www.heroui.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

This repository is auto-synced. To contribute:

1. Fork the [mono-repo](https://github.com/TheeCryptoChad/mono-repo)
2. Make changes in `apps/template-app-base/`
3. Submit a pull request to the mono-repo

## 📄 License

MIT

---

**Made with ❤️ using the power of monorepos and automation**
