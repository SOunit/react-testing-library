import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

describe("summary form test", () => {
  const checkboxLabelText = /terms and conditions/i;
  const buttonName = /confirm order/i;
  const popoverText = /no ice cream will actually be delivered/i;

  test("initial conditions", () => {
    render(<SummaryForm />);

    const checkbox = screen.getByRole("checkbox", {
      name: checkboxLabelText,
    });
    const button = screen.getByRole("button", { name: buttonName });

    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();
  });

  test("checkbox enables button on first click", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", { name: checkboxLabelText });
    const button = screen.getByRole("button", { name: buttonName });

    // click checkbox
    userEvent.click(checkbox);

    // test button enabled
    expect(button).toBeEnabled();
  });

  test("checkbox disables button on second click", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", { name: checkboxLabelText });
    const button = screen.getByRole("button", { name: buttonName });

    // uncheck checkbox
    userEvent.click(checkbox);
    userEvent.click(checkbox);

    expect(button).toBeDisabled();
  });

  test("popover responds to hover", async () => {
    render(<SummaryForm />);

    // popover starts out hidden
    const nullPopover = screen.queryByText(popoverText);
    expect(nullPopover).not.toBeInTheDocument();

    // popover appears upon mouseover of checkbox label
    const termsAndConditions = screen.getByText(checkboxLabelText);
    userEvent.hover(termsAndConditions);
    const popover = screen.getByText(popoverText);
    // best practice for readable code to include this expectation
    expect(popover).toBeInTheDocument();

    // popover disappears when we mouse out
    userEvent.unhover(termsAndConditions);
    await waitForElementToBeRemoved(() => screen.queryByText(popoverText));
  });
});
