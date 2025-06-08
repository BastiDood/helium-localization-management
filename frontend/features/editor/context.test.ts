import { beforeEach, describe, expect, test } from "vitest";
import { cleanup, renderHook } from "@testing-library/react";

import { useEditorStore, useSearchStore } from "./context";

beforeEach(cleanup);

describe("useEditorStore", () => {
  test("should respond to translation updates", () => {
    const { result } = renderHook(useEditorStore);
    {
      const state = result.current.getState();
      expect(state.edits.size).toBe(0);
      state.setTranslation("hello", "world");
    }
    {
      const state = result.current.getState();
      expect(state.edits.get("hello")).toBe("world");
      expect(state.edits.get("world")).toBeUndefined();
    }
  });
});

describe("useSearchStore", () => {
  test("should return the correct store", () => {
    const { result } = renderHook(useSearchStore);
    {
      const state = result.current.getState();
      expect(state.query.length).toBe(0);
      state.setQuery("test");
    }
    {
      const state = result.current.getState();
      expect(state.query).toBe("test");
    }
  });
});
