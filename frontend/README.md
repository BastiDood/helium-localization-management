This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

This project uses `pnpm` as the package manager. This should be handled by [`corepack`], which is included in every Node.js installation up to v24.

[`pnpm`]: https://pnpm.io/
[`corepack`]: https://github.com/nodejs/corepack

Before starting the project, make sure that you have the following environment variables set via a `.env` file in the Next.js project root.

| **Environment Variable** | **Notes**                                                               |
| ------------------------ | ----------------------------------------------------------------------- |
| `NEXT_PUBLIC_API_ORIGIN` | Sets the origin URL which will be used as the base for all API queries. |

```bash
# Install project dependencies.
pnpm install

# Run the basic unit tests in watch mode.
pnpm test

# Start the Next.js Turbopack dev server at http://localhost:3000/.
pnpm dev
```
