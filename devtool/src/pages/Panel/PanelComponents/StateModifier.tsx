import React, { ChangeEvent, useRef, useState } from "react";
import "./StateModifier.css";

interface StateModifierProps {
  initValue: number | string;
}
const StateModifier = ({ initValue }: StateModifierProps) => {
  const [inputValue, setInputValue] = useState(initValue);

  const input = useRef<HTMLInputElement>(null!);
  const display = useRef<HTMLInputElement>(null!);

  function handleKeyPress(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.code !== "Enter") return;
    handleSubmit();
  }
  function handleClickToEdit() {
    display.current.style.display = "none";
    input.current.style.display = "block";
    input.current.focus();
    input.current.select();
  }

  function handleSubmit() {
    // Return if the type doesn't match

    input.current.style.display = "none";
    display.current.style.display = "block";
    console.log("submitting: ", inputValue);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }
  return (
    <div className="state-modifier">
      <div>
        <input
          style={{ display: "none" }}
          onKeyDown={handleKeyPress}
          ref={input}
          onBlur={handleSubmit}
          onChange={handleChange}
          placeholder={String(inputValue)}
        />
      </div>
      <div className="state-display" onClick={handleClickToEdit}>
        <p ref={display}>{inputValue}</p>
      </div>
    </div>
  );
};

export default StateModifier;
