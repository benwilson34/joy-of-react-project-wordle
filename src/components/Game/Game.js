import React from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import { checkGuess } from "../../game-helpers";
import GuessInput from "../GuessInput/GuessInput";
import GuessResults from "../GuessResults/GuessResults";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";

const GameState = {
  RUNNING: "RUNNING",
  LOSE: "LOSE",
  WIN: "WIN",
};

function Game() {
  // Pick a random word on every pageload.
  const [answer, setAnswer] = React.useState(sample(WORDS));
  // To make debugging easier, we'll log the solution in the console.
  console.info({ answer });
  /* Expected shape: [[{ letter: 'W', status: 'incorrect }, { ... }], [...], ...] */
  const [guesses, setGuesses] = React.useState([]);
  const [gameState, setGameState] = React.useState(GameState.RUNNING);

  const handleGameReset = () => {
    setAnswer(sample(WORDS));
    setGuesses([]);
    setGameState(GameState.RUNNING);
  };

  const handleGuessSubmit = (nextGuess) => {
    const guessResult = checkGuess(nextGuess, answer);
    const nextGuesses = [...guesses, guessResult];
    setGuesses(nextGuesses);
    if (nextGuesses.length === NUM_OF_GUESSES_ALLOWED) {
      setGameState(GameState.LOSE);
    }
    if (nextGuess === answer) {
      setGameState(GameState.WIN);
    }
  };

  const renderBanner = () => {
    const didWin = gameState === GameState.WIN;
    const message = didWin ? (
      <p>
        <strong>Congratulations!</strong> Got it in{" "}
        <strong>
          {guesses.length} guess{guesses.length > 1 ? "es" : ""}
        </strong>
        .
      </p>
    ) : (
      <p>
        Sorry, the correct answer is <strong>{answer}</strong>.
      </p>
    );
    return (
      <div className={`banner ${didWin ? "happy" : "sad"}`}>
        {message}
        <div>
          <button
            onClick={() => handleGameReset()}
            style={{
              border: "1px solid white",
              borderRadius: ".5rem",
              padding: "0 .25rem",
            }}
          >
            Play again?
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <GuessResults guesses={guesses} />

      <GuessInput
        onGuessSubmit={handleGuessSubmit}
        isDisabled={gameState !== GameState.RUNNING}
      />

      {gameState !== GameState.RUNNING && renderBanner()}
    </>
  );
}

export default Game;
