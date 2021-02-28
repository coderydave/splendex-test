import React, { memo, useContext, useCallback } from "react";
import logo from "../../assets/splendex-logo.svg";
import { AppContext } from "../../context/AppContext";
import { Button } from "../button";
import { Dropdowns } from "../dropdowns";
import "./header.style.css";

export const Header = memo(() => {
  const {
    isGameStarted,
    deckSize,
    setDeckSize,
    setIsGameStarted,
    generateDeck,
  } = useContext(AppContext);

  const onStartCallback = useCallback(() => {
    setIsGameStarted(true);
    generateDeck();
  }, [setIsGameStarted, generateDeck]);

  return (
    <div className="header">
      <img src={logo} alt="Logo" />
      {isGameStarted && (
        <div className="v2">
          <Dropdowns value={deckSize} onChange={setDeckSize} />
          <div className="mod"></div>
          <Button
            text="start new game"
            variant="primary"
            onClick={onStartCallback}
          />
        </div>
      )}
    </div>
  );
});
