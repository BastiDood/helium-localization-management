import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, expect, test } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";

import { CreateProjectLocaleButton } from "./create";

beforeEach(cleanup);

test("renders create project locale button", async () => {
  const projectId = crypto.randomUUID();
  const screen = render(
    <QueryClientProvider client={new QueryClient()}>
      <CreateProjectLocaleButton id={projectId} />
    </QueryClientProvider>,
  );

  const button = await screen.findByRole("button");
  expect(button).toBeDefined();
});

test("opens modal when button is clicked", async () => {
  const projectId = crypto.randomUUID();
  const screen = render(
    <QueryClientProvider client={new QueryClient()}>
      <CreateProjectLocaleButton id={projectId} />
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
  const projectId = crypto.randomUUID();
  const screen = render(
    <QueryClientProvider client={new QueryClient()}>
      <CreateProjectLocaleButton id={projectId} />
    </QueryClientProvider>,
  );

  const button = await screen.findByRole("button");
  fireEvent.click(button);

  // Check for dialog title
  expect(screen.getByText("Create Language")).toBeDefined();

  // Check for dialog description
  expect(
    screen.getByText("Enter a locale code to add a new language to this project."),
  ).toBeDefined();
});

test("modal contains form with input and submit button", async () => {
  const projectId = crypto.randomUUID();
  const screen = render(
    <QueryClientProvider client={new QueryClient()}>
      <CreateProjectLocaleButton id={projectId} />
    </QueryClientProvider>,
  );

  const button = await screen.findByRole("button");
  fireEvent.click(button);

  // Check for the locale input field
  const input = await screen.findByPlaceholderText("en-US");
  expect(input).toBeDefined();
  expect(input.getAttribute("type")).toBe("text");
  expect(input.getAttribute("name")).toBe("locale");
  expect(input.hasAttribute("required")).toBe(true);

  // Check for the submit button (should contain "Create" text)
  const submitButton = screen.getByRole("button", { name: /create/i });
  expect(submitButton).toBeDefined();
  expect(submitButton.getAttribute("type")).toBe("submit");
});
