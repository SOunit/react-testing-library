import { render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

describe("summary form test", () => {
  const checkboxName = /terms and conditions/i;
  const buttonName = /confirm order/i;

  test("initial conditions", () => {
    render(<SummaryForm />);

    const checkbox = screen.getByRole("checkbox", {
      name: checkboxName,
    });
    const button = screen.getByRole("button", { name: buttonName });

    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();
  });

  test("checkbox enables button on first click", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", { name: checkboxName });
    const button = screen.getByRole("button", { name: buttonName });

    // click checkbox
    userEvent.click(checkbox);

    // test button enabled
    expect(button).toBeEnabled();
  });

  test("checkbox disables button on second click", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", { name: checkboxName });
    const button = screen.getByRole("button", { name: buttonName });

    // uncheck checkbox
    userEvent.click(checkbox);
    userEvent.click(checkbox);

    expect(button).toBeDisabled();
  });
});

test("popover responds to hover", () => {
  // popover starts out hidden
  // popover appears upon mouseover of checkbox label
  // popover disappears when we mouse out
});
