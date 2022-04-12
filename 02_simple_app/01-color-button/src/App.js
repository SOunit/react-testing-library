import { useState } from "react";
import "./App.css";

export const replaceCamelWithSpace = (colorName) => {
  return colorName.replace(/\B([A-Z])\B/g, " $1");
};

function App() {
  const [buttonColor, setButtonColor] = useState("MediumVioletRed");
  const newButtonColor =
    buttonColor === "MediumVioletRed" ? "MidnightBlue" : "MediumVioletRed";
  const [disabled, setDisabled] = useState(false);

  return (
    <div>
      <button
        style={{ backgroundColor: disabled ? "grey" : buttonColor }}
        onClick={() => {
          setButtonColor(newButtonColor);
        }}
        disabled={disabled}
      >
        Change to {replaceCamelWithSpace(newButtonColor)}
      </button>
      <input
        type="checkbox"
        id="disable-button-checkbox"
        defaultChecked={disabled}
        aria-checked={disabled}
        onClick={(e) => {
          setDisabled(e.target.checked);
        }}
      />
      <label htmlFor="disable-button-checkbox">Disable button</label>
    </div>
  );
}

export default App;
