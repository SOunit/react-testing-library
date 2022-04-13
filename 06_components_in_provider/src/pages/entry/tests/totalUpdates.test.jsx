import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";
import Options from "../Options";

test("update scoop subtotal when scoops change", async () => {
  render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });

  // make sure total starts out $0.00
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // update vanilla scoops to 1 and check subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update topping subtotal when toppings change", async () => {
  render(<Options optionType="toppings" />, { wrapper: OrderDetailsProvider });
  const cherriesInput = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  const mAndMInput = await screen.findByRole("checkbox", {
    name: "M&Ms",
  });
  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });

  // check default
  expect(toppingsSubtotal).toHaveTextContent("0.00");

  // click and check subtotal
  userEvent.click(cherriesInput);
  expect(toppingsSubtotal).toHaveTextContent("1.50");

  // click another checkbox and see subtotal
  userEvent.click(mAndMInput);
  expect(toppingsSubtotal).toHaveTextContent("3.00");

  // click checkbox off and see subtotal
  userEvent.click(mAndMInput);
  expect(toppingsSubtotal).toHaveTextContent("1.50");
});
