if (typeof process.env.NEXT_PUBLIC_API_ORIGIN === "undefined")
  throw new Error("NEXT_PUBLIC_API_ORIGIN is not set");
export const API_ORIGIN = process.env.NEXT_PUBLIC_API_ORIGIN;
