import { beforeEach, expect, test } from "vitest";
import { cleanup, render } from "@testing-library/react";

import { NavigationList } from "./list";

beforeEach(cleanup);

test("renders no locales", async () => {
  const screen = render(<NavigationList data={[]} />);

  const list = await screen.findByRole("list");
  expect(list.childNodes).toHaveLength(0);
});

test("renders only one locale", async () => {
  const projectId = crypto.randomUUID();
  const locale = "en";

  const screen = render(<NavigationList data={[{ locale, project_id: projectId }]} />);

  expect(screen.getByText(locale)).toBeDefined();

  const link = await screen.findByRole("link");
  expect(link.getAttribute("href")).toBe(`/dashboard/${projectId}/${locale}`);
  expect(link.getAttribute("title")).toBe(locale);
  expect(link.textContent).toBe(locale);
});

test("renders multiple locales", async () => {
  const projectId = crypto.randomUUID();
  const locale1 = "en";
  const locale2 = "fr";

  const screen = render(
    <NavigationList
      data={[
        { locale: locale1, project_id: projectId },
        { locale: locale2, project_id: projectId },
      ]}
    />,
  );

  expect(screen.getByText(locale1)).toBeDefined();
  expect(screen.getByText(locale2)).toBeDefined();
});
