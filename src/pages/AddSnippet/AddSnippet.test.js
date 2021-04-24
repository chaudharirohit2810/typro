// __tests__/fetch.test.js
import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  act,
  cleanup,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AddSnippet from "./index";
import configs from "../../config";

const server = setupServer(
  rest.post(`${configs.BACKEND_URL}/snippets/`, (req, res, ctx) => {
    return res(ctx.json("Snippet added successfully"));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("checks rendered component", async () => {
  const { queryByTitle, queryByText } = render(<AddSnippet />);

  expect(queryByText("Add New Snippet")).toBeTruthy();

  expect(queryByTitle("language_selector")).toHaveValue("C");
  expect(queryByTitle("url")).toBeTruthy();
  expect(queryByTitle("submit")).toHaveAttribute("type", "submit");
  expect(queryByTitle("snippet")).toHaveAttribute("rows", "10");
});

test("handles snippet submission", async () => {
  server.use(
    rest.post(`${configs.BACKEND_URL}/snippets/`, (req, res, ctx) => {
      return res(ctx.json("Snippet added successfully"));
    })
  );

  const { queryByTitle, queryByText } = render(<AddSnippet />);
  const language_selector = queryByTitle("language_selector");
  const snippet_input = queryByTitle("snippet");
  const url_input = queryByTitle("url");
  const submit_btn = queryByTitle("submit");
  act(() => {
    fireEvent.change(language_selector, { target: { value: "Java" } });
  });
  expect(language_selector).toHaveValue("Java");

  act(() => {
    fireEvent.change(snippet_input, {
      target: { value: "This is c code snippet" },
    });
  });
  expect(snippet_input).toHaveValue("This is c code snippet");

  act(() => {
    fireEvent.change(url_input, { target: { value: "123.com" } });
  });
  expect(url_input).toHaveValue("123.com");
  act(() => {
    fireEvent.click(submit_btn);
  });

  expect(
    await screen.findByText("Adding snippet....", { exact: false })
  ).toBeInTheDocument();

  expect(language_selector).toHaveValue("C");
  expect(snippet_input).toHaveValue("");
  expect(url_input).toHaveValue("");
});
