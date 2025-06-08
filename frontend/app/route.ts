import { redirect } from "next/navigation";

export function GET() {
  // TODO: This is supposed to be a login screen, but I've removed user authentication for now
  // as it is beyond the scope of the assignment.
  redirect("/dashboard");
}
