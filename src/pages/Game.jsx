import React, { useCallback } from "react";
import { memo, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../components/button/button.component";
import { Dropdowns } from "../components/dropdowns/dropdowns.component";
import { AppContext } from "../context/AppContext";
import "./game.page.css";

const Game = memo(() => {
  const { deckSize, setDeckSize, generateDeck } = useContext(AppContext);
  const history = useHistory();

  const onStartCallback = useCallback(() => {
    generateDeck();
    history.push("/game");
  }, [generateDeck, history]);

  return (
    <div className="game-container">
      <h1>Splendex Memory Game</h1>
      <Dropdowns value={deckSize} onChange={setDeckSize} />
      <Button
        text="start new game"
        variant="primary"
        onClick={onStartCallback}
      />
    </div>
  );
});

export default Game;
