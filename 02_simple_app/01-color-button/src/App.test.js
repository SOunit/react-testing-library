import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  // create virtual DOM
  render(<App />);

  // access to an element
  const linkElement = screen.getByRole("link", { name: /learn react/i });

  // assertion to have success / fail
  expect(linkElement).toBeInTheDocument();
});
