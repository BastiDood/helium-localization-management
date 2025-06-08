# Localization Management API

This repository contains a take-home assignment for a localization management API that uses [Next.js (TypeScript) for the front end][front-end] and [FastAPI (Python) for the back end][back-end]. The project uses [Supabase][supabase] as the database provider.

[front-end]: ./frontend/
[back-end]: ./api/
[supabase]: https://supabase.com/

> [!NOTE]
> User authentication has been omitted from the example deployment because it is beyond the scope of the take-home assignment.

## Getting Started

The [`schema.sql`] file contains the initial migration of the database. Ideally, this should be maintained via some automated migration solution, but I didn't want to over-engineer the implementation.

[`schema.sql`]: ./schema.sql

To get started, we first need to load this schema into Supabase. I did this with the SQL editor to keep it simple, but it is possible to use [Supabase's built-in declarative migration differ][supabase-migration]. Again, in the interest of time, I didn't bother over-engineering this part.

[supabase-migration]: https://supabase.com/docs/guides/deployment/database-migrations

Next, we need to host the Python-based API server. See the instructions for setting this up in the [back end project][back-end].

Finally, we need to set up the Next.js server. See the instructions for setting this up in the [front end project][front-end].
