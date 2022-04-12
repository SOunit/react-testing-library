import { render, screen, fireEvent } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

describe("summary form test", () => {
  const checkboxName = "I agree to Terms and Conditions";
  const buttonName = "Confirm order";

  test("checkbox is unchecked by default", () => {
    render(<SummaryForm />);

    const checkbox = screen.getByRole("checkbox", {
      name: checkboxName,
    });

    expect(checkbox).not.toBeChecked();
  });

  test("click checkbox enable button", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", { name: checkboxName });
    const button = screen.getByRole("button", { name: buttonName });

    // click checkbox
    fireEvent.click(checkbox);

    // test button enabled
    expect(button).toBeEnabled();
  });

  test("uncheck checkbox disables button", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", { name: checkboxName });
    const button = screen.getByRole("button", { name: buttonName });

    // uncheck checkbox
    fireEvent.click(checkbox);
    fireEvent.click(checkbox);

    expect(button).toBeDisabled();
  });
});
