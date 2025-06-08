import { assert, beforeEach, expect, test } from "vitest";
import { cleanup, fireEvent, render, renderHook } from "@testing-library/react";

import { SearchBar } from "./search";
import { useSearchStore } from "./context";

beforeEach(cleanup);

test("search bar mounts as an empty text input", () => {
  const screen = render(<SearchBar />);
  const input = screen.getByRole("textbox");
  assert(input instanceof HTMLInputElement);
  expect(input.value).toBe("");
  expect(input.type).toBe("text");
  expect(input.placeholder).toBe("Search translation keys...");
});

test("search content updates query store on input", () => {
  const screen = render(<SearchBar />);
  const input = screen.getByRole("textbox");

  assert(input instanceof HTMLInputElement);
  expect(input.value).toBe("");
  expect(input.type).toBe("text");
  expect(input.placeholder).toBe("Search translation keys...");

  fireEvent.change(input, { target: { value: "test" } });
  expect(input.value).toBe("test");

  const { result } = renderHook(useSearchStore);
  expect(result.current.getState().query).toBe("test");
});
