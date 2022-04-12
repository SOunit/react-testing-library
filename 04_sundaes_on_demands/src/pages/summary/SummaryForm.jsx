import { useState } from "react";

const SummaryForm = () => {
  const [checked, setChecked] = useState(false);

  const clickCheckboxHandler = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div>
      <input
        type="checkbox"
        id="terms-and-conditions"
        checked={checked}
        onChange={clickCheckboxHandler}
      />
      <label htmlFor="terms-and-conditions">
        I agree to Terms and Conditions
      </label>
      <button disabled={!checked}>Confirm order</button>
    </div>
  );
};

export default SummaryForm;
