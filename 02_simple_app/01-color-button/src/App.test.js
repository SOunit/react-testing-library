import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

// unit test have 1 assertion
// functional test has multiple assertions
test("button has correct initial color", () => {
  // test steps
  // 1. render
  render(<App />);

  // 2. find element
  const colorButton = screen.getByRole("button", { name: "Change to blue" });

  // 3. create assertion
  expect(colorButton).toHaveStyle({ backgroundColor: "red" });

  // click button
  fireEvent.click(colorButton);

  expect(colorButton).toHaveStyle({ backgroundColor: "blue" });
  expect(colorButton.textContent).toBe("Change to red");
});

test("initial conditions", () => {
  render(<App />);

  // check that the button starts out enabled
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  expect(colorButton).toBeEnabled();

  // check that the checkbox starts out unchecked
  const checkBox = screen.getByRole("checkbox");
  expect(checkBox).not.toBeChecked();
});