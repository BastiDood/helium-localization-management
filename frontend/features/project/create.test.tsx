import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, expect, test } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";

import { CreateProjectButton } from "./create";

beforeEach(cleanup);

test("renders create project button", async () => {
  const screen = render(
    <QueryClientProvider client={new QueryClient()}>
      <CreateProjectButton />
    </QueryClientProvider>,
  );

  const button = await screen.findByRole("button");
  expect(button).toBeDefined();
});

test("opens modal when button is clicked", async () => {
  const screen = render(
    <QueryClientProvider client={new QueryClient()}>
      <CreateProjectButton />
    </QueryClientProvider>,
  );

  // Initially, the modal should not be visible
  expect(screen.queryByRole("dialog")).toBeNull();

  // Click the button to open the modal
  const button = await screen.findByRole("button");
  fireEvent.click(button);

  // Modal should now be visible
  const dialog = await screen.findByRole("dialog");
  expect(dialog).toBeDefined();
});

test("modal contains correct title and description", async () => {
  const screen = render(
    <QueryClientProvider client={new QueryClient()}>
      <CreateProjectButton />
    </QueryClientProvider>,
  );

  const button = await screen.findByRole("button");
  fireEvent.click(button);

  // Check for dialog title
  expect(screen.getByText("Create Project")).toBeDefined();

  // Check for dialog description
  expect(screen.getByText("Enter a new project name to get started.")).toBeDefined();
});

test("modal contains form with input and submit button", async () => {
  const screen = render(
    <QueryClientProvider client={new QueryClient()}>
      <CreateProjectButton />
    </QueryClientProvider>,
  );

  const button = await screen.findByRole("button");
  fireEvent.click(button);

  // Check for the input field
  const input = await screen.findByPlaceholderText("My Project");
  expect(input).toBeDefined();
  expect(input.getAttribute("type")).toBe("text");
  expect(input.getAttribute("name")).toBe("name");
  expect(input.hasAttribute("required")).toBe(true);

  // Check for the submit button (should contain "Create" text)
  const submitButton = screen.getByRole("button", { name: /create/i });
  expect(submitButton).toBeDefined();
  expect(submitButton.getAttribute("type")).toBe("submit");
});
