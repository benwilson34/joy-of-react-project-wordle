import React from "react";

function GuessInput({ onGuessSubmit, isDisabled }) {
  const [currentGuess, setCurrentGuess] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ guess: currentGuess }); // TODO remove
    onGuessSubmit(currentGuess);
    setCurrentGuess("");
  };

  const handleChange = (event) => {
    const convertedValue = event.target.value.toUpperCase();
    setCurrentGuess(convertedValue);
  };

  return (
    <form className="guess-input-wrapper" onSubmit={handleSubmit}>
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        id="guess-input"
        type="text"
        value={currentGuess}
        onChange={handleChange}
        required={true}
        maxLength={5}
        pattern="[A-Z]{5}"
        disabled={isDisabled}
      />
    </form>
  );
}

export default GuessInput;
