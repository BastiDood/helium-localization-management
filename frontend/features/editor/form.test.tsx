import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { assert, beforeEach, expect, test } from "vitest";
import { cleanup, render, renderHook } from "@testing-library/react";

import { SaveEditorButton } from "./form";
import { useEditorStore } from "./context";

beforeEach(cleanup);

test("save editor button mounts with default inputs", () => {
  const id = crypto.randomUUID();
  const locale = "en";
  const screen = render(
    <QueryClientProvider client={new QueryClient()}>
      <SaveEditorButton id={id} locale={locale} />
    </QueryClientProvider>,
  );

  // Check that a form exists
  const form = screen.getByRole("form");
  assert(form instanceof HTMLFormElement);

  const data = new FormData(form);
  expect(data.get("project_id")).toBe(id);
  expect(data.get("project_locale")).toBe(locale);

  // Check for Save submit button
  const saveButton = screen.getByRole("button", { name: /save/i });
  assert(saveButton instanceof HTMLButtonElement);
  expect(saveButton.type).toBe("submit");
});

test("save editor button reacts to new translation updates", () => {
  const { result } = renderHook(useEditorStore);
  result.current.getState().setTranslation("hello", "world");
  result.current.getState().setTranslation("world", "hello");

  const id = crypto.randomUUID();
  const locale = "en";
  const screen = render(
    <QueryClientProvider client={new QueryClient()}>
      <SaveEditorButton id={id} locale={locale} />
    </QueryClientProvider>,
  );

  const form = screen.getByRole("form");
  assert(form instanceof HTMLFormElement);

  const data = new FormData(form);
  expect(data.get("project_id")).toBe(id);
  expect(data.get("project_locale")).toBe(locale);

  expect(data.get("data[0].project_key")).toBe("hello");
  expect(data.get("data[0].translation")).toBe("world");

  expect(data.get("data[1].project_key")).toBe("world");
  expect(data.get("data[1].translation")).toBe("hello");
});
