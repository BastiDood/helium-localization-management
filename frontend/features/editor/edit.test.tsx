import { assert, beforeEach, expect, test } from "vitest";
import { cleanup, fireEvent, render, renderHook } from "@testing-library/react";

import { TranslationEditorContent } from "./edit";
import { useSearchStore } from "./context";

beforeEach(cleanup);

test("translation editor content renders no text areas initially", () => {
  const screen = render(<TranslationEditorContent keys={[]} registry={new Map()} />);

  // Check that no text areas are rendered
  const inputs = screen.queryAllByRole("textbox");
  expect(inputs).toHaveLength(0);

  // Check that the container div exists but is empty of translation inputs
  const container = screen.container.firstChild;
  expect(container).toBeDefined();
});

test("translation editor content renders empty text areas when keys are provided", () => {
  const screen = render(
    <TranslationEditorContent
      keys={[{ key: "hello.world" }, { key: "goodbye.world" }, { key: "test.key" }]}
      registry={new Map()}
    />,
  );

  // Check that text areas are rendered for each key
  const inputs = screen.getAllByRole("textbox");
  expect(inputs).toHaveLength(3);

  // Check that all text areas are empty
  for (const input of inputs) {
    assert(input instanceof HTMLTextAreaElement);
    expect(input.value).toBe("");
  }

  // Check that labels contain the correct key names
  expect(screen.getByText("hello.world")).toBeDefined();
  expect(screen.getByText("goodbye.world")).toBeDefined();
  expect(screen.getByText("test.key")).toBeDefined();
});

test("typing into text area updates its value", () => {
  const screen = render(
    <TranslationEditorContent keys={[{ key: "hello.world" }]} registry={new Map()} />,
  );

  const textarea = screen.getByRole("textbox");
  assert(textarea instanceof HTMLTextAreaElement);

  // Type into the text area
  expect(textarea.value).toBe("");
  fireEvent.input(textarea, { target: { value: "Hello World!" } });
  expect(textarea.value).toBe("Hello World!");
});

test("text area initial value is set from registry when key matches", () => {
  const screen = render(
    <TranslationEditorContent
      keys={[{ key: "greeting" }, { key: "farewell" }]}
      registry={new Map([["greeting", "Hello there!"]])}
    />,
  );

  const [greeting, farewell, ...rest] = screen.getAllByRole("textbox");
  expect(rest).toHaveLength(0);
  assert(farewell instanceof HTMLTextAreaElement);
  assert(greeting instanceof HTMLTextAreaElement);

  expect(greeting.value).toBe("Hello there!");
  expect(farewell.value).toBe("");
});

test("fuzzy search filters keys when query is non-empty", () => {
  const { result } = renderHook(useSearchStore);
  result.current.getState().setQuery("auth");

  const screen = render(
    <TranslationEditorContent
      keys={[
        { key: "authentication.login" },
        { key: "navigation.menu" },
        { key: "profile.settings" },
        { key: "dashboard.widgets" },
      ]}
      registry={new Map()}
    />,
  );

  // Should only show the authentication key that matches "auth"
  expect(screen.queryByText("authentication.login")).toBeDefined();
  expect(screen.queryByText("navigation.menu")).toBeNull();
  expect(screen.queryByText("profile.settings")).toBeNull();
  expect(screen.queryByText("dashboard.widgets")).toBeNull();

  const inputs = screen.getAllByRole("textbox");
  expect(inputs).toHaveLength(1);
});
