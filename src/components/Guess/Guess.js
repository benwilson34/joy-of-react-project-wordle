import React from "react";
import { range } from "../../utils";
import { LETTERS_PER_GUESS } from "../../constants";

function Guess({ value }) {
  return (
    <p className="guess">
      {range(LETTERS_PER_GUESS).map((letterIndex) => (
        <span
          key={letterIndex}
          className={`cell ${value[letterIndex]?.status || ''}`}
        >
          {value[letterIndex]?.letter}
        </span>
      ))}
    </p>
  );
}

export default Guess;
