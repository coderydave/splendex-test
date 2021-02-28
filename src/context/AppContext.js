import React, { createContext, useCallback, useEffect, useState } from "react";
import {
  Angular,
  De,
  Jenkins,
  Postcsss,
  Redux,
  React as REACT,
  Sass,
  Splendex,
  Ts,
  Webpack,
} from "../assets";

const CARDS_ARRAY = [
  Angular,
  De,
  Jenkins,
  Postcsss,
  Redux,
  REACT,
  Sass,
  Splendex,
  Ts,
  Webpack,
];

const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const [deckSize, setDeckSize] = useState(10);
  const [stepCount, setStepCount] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [deck, setDeck] = useState([]);
  const [bestScore, setBestScore] = useState(
    localStorage.getItem("bestScore") || 10
  );

  const [que, setQue] = useState([]);
  const [flippedPairs, setFlippedPairs] = useState([]);

  const [isGameOver, setIsGameOver] = useState(false);

  const generateDeck = useCallback(() => {
    const cardsNeeded = deckSize / 2;
    const mainDeck = [];
    for (let index = 0; index < cardsNeeded; index++) {
      const card_one = {
        image: CARDS_ARRAY[index],
        tag: index,
        flipped: false,
      };
      const card_two = {
        image: CARDS_ARRAY[index],
        tag: index,
        flipped: false,
      };
      mainDeck.push(card_one, card_two);
    }
    const shuffle = mainDeck.sort(() => 0.5 - Math.random());
    console.log(deckSize.length);

    setDeck(shuffle);
    setStepCount(0);
    setIsGameStarted(true);
    setFlippedPairs([]);
  }, [deckSize, setDeck, setStepCount, setIsGameStarted]);

  const resetCallback = useCallback(() => {
    setDeckSize(10);
    setStepCount(0);
    setFlippedPairs([]);
    generateDeck();
  }, [setDeckSize, setStepCount, generateDeck, setFlippedPairs]);

  const onFlipp = useCallback(
    (idx, card) => {
      const newDeck = [...deck];
      newDeck[idx].flipped = !newDeck[idx].flipped;
      setDeck(newDeck);
      setQue([...que, card]);
    },
    [deck, setDeck, que, setQue]
  );

  useEffect(() => {
    if (que && que.length === 2) {
      const isPair = que[0].tag === que[1].tag;
      if (isPair) {
        // PUSH
        const flipped = [...flippedPairs];
        flipped.push(que[0], que[1]);
        const nextStep = stepCount + 1;
        setQue([]);
        setFlippedPairs(flipped);
        setStepCount(nextStep);
      } else {
        // Flip back
        const newDeck = [...deck];
        newDeck.forEach((card, idx) => {
          if (card.tag === que[0].tag || card.tag === que[1].tag) {
            newDeck[idx].flipped = false;
          }
        });
        setTimeout(() => {
          const nextStep = stepCount + 1;
          setQue([]);
          setDeck(newDeck);
          setStepCount(nextStep);
        }, 1000);
      }
    }
  }, [deck, setDeck, que, setQue, flippedPairs, setFlippedPairs, stepCount]);

  useEffect(() => {
    if (flippedPairs.length && flippedPairs.length === deck.length) {
      if (stepCount < bestScore) {
        localStorage.setItem("bestScore", stepCount);
        setBestScore(stepCount);
      }
      alert("Game over");
      setIsGameOver(true);
    }
  }, [flippedPairs, setFlippedPairs, deck, stepCount, bestScore]);

  return (
    <AppContext.Provider
      value={{
        deckSize,
        setDeckSize,
        isGameStarted,
        setIsGameStarted,
        stepCount,
        setStepCount,
        generateDeck,
        deck,
        setDeck,
        onFlipp,
        flippedPairs,
        resetGame: resetCallback,
        isGameOver,
        bestScore,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
