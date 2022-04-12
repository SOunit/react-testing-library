import { render, screen, fireEvent } from "@testing-library/react";
import App, { replaceCamelWithSpace } from "./App";

// unit test have 1 assertion
// functional test has multiple assertions
test("button has correct initial color", () => {
  // test steps
  // 1. render
  render(<App />);

  // 2. find element
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });

  // 3. create assertion
  expect(colorButton).toHaveStyle({ backgroundColor: "MediumVioletRed" });

  // click button
  fireEvent.click(colorButton);

  expect(colorButton).toHaveStyle({ backgroundColor: "MidnightBlue" });
  expect(colorButton).toHaveTextContent("Change to Medium Violet Red");
});

test("initial conditions", () => {
  render(<App />);

  // check that the button starts out enabled
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  expect(colorButton).toBeEnabled();

  // check that the checkbox starts out unchecked
  const checkBox = screen.getByRole("checkbox");
  expect(checkBox).not.toBeChecked();
});

test("check box disables button on first click and enables button on second click", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  const checkBox = screen.getByRole("checkbox", { name: "Disable button" });

  // disabled when check box is not checked
  fireEvent.click(checkBox);
  expect(colorButton).toBeDisabled();

  // enabled when check box is checked
  fireEvent.click(checkBox);
  expect(colorButton).toBeEnabled();
});

test("Disabled button has grey background and reverts to red", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  const checkBox = screen.getByRole("checkbox", { name: "Disable button" });

  // disable button
  fireEvent.click(checkBox);
  expect(colorButton).toHaveStyle({ backgroundColor: "grey" });

  // re-enable button
  fireEvent.click(checkBox);
  expect(colorButton).toHaveStyle({ backgroundColor: "MediumVioletRed" });
});

test("clicked disabled button has grey background and reverts to blue", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  const checkBox = screen.getByRole("checkbox", { name: "Disable button" });

  // change button to blue
  fireEvent.click(colorButton);

  // disable button
  fireEvent.click(checkBox);
  expect(colorButton).toHaveStyle({ backgroundColor: "grey" });

  // re-enable button
  fireEvent.click(checkBox);
  expect(colorButton).toHaveStyle({ backgroundColor: "MidnightBlue" });
});

describe("spaces before camel-case capital letters", () => {
  test("Works for no inner capital letters", () => {
    expect(replaceCamelWithSpace("Red")).toBe("Red");
  });
  test("Works for one inner capital letters", () => {
    expect(replaceCamelWithSpace("MidnightBlue")).toBe("Midnight Blue");
  });
  test("Works for multiple inner capital letters", () => {
    expect(replaceCamelWithSpace("MediumVioletRed")).toBe("Medium Violet Red");
  });
});
