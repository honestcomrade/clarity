# Clarity

A modern task management API demonstrating clean architecture patterns in TypeScript.

## Tech Stack

- **API**: Express.js + TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Infrastructure**: Docker

## Project Structure

```
├── src/
│   ├── routes/        # Request handlers
│   ├── repositories/  # Data access layer
│   ├── domain/        # Business logic and types
│   └── config/        # App configuration
├── prisma/
│   └── schema.prisma  # Database schema
└── init-scripts/      # Database initialization
    ├── 01-schema.sql  # Table definitions
    └── 02-seed.sql    # Initial data
```

## Getting Started

### Prerequisites

- Node.js 20+
- Docker Desktop

### Setup

```bash
# Install dependencies
npm install

# Start database and server
npm run dev

# Reset database to initial state
npm run db:reset
```

### Database

- Main DB: `postgresql://user:password@localhost:5432/taskdb`
- Test DB: `postgresql://user:password@localhost:5433/taskdb_test`
