import { beforeEach, expect, test } from "vitest";
import { cleanup, render } from "@testing-library/react";

import { NavigationList } from "./list";

beforeEach(cleanup);

test("renders no projects", async () => {
  const screen = render(<NavigationList data={[]} />);

  const list = await screen.findByRole("list");
  expect(list.childNodes).toHaveLength(0);
});

test("renders only one project", async () => {
  const id = crypto.randomUUID();
  const name = "Test Project";

  const screen = render(<NavigationList data={[{ id, name }]} />);
  expect(screen.getByText(name)).toBeDefined();

  const link = await screen.findByRole("link");
  expect(link.getAttribute("href")).toBe(`/dashboard/${id}`);
});

test("renders multiple projects", async () => {
  const id1 = crypto.randomUUID();
  const id2 = crypto.randomUUID();
  const name1 = "Test Project 1";
  const name2 = "Test Project 2";

  const screen = render(
    <NavigationList
      data={[
        { id: id1, name: name1 },
        { id: id2, name: name2 },
      ]}
    />,
  );

  expect(screen.getByText(name1)).toBeDefined();
  expect(screen.getByText(name2)).toBeDefined();
});
