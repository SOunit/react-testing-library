import { render, screen } from "@testing-library/react";
import App from "./App";

test("button has correct initial color", () => {
  // test steps
  // 1. render
  render(<App />);

  // 2. find element
  const colorButton = screen.getByRole("button", { name: "Change to blue" });

  // 3. create assertion
  expect(colorButton).toHaveStyle({ backgroundColor: "red" });
});
test("button turns blue when clicked", () => {});
