import { memo, useCallback, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useHistory } from "react-router-dom";
import { Card } from "../components/card/card.component";
import "./main.page.css";
import { Button } from "../components/button/button.component";

const Main = memo(() => {
  const { deck, onFlipp, stepCount, setIsGameStarted, bestScore } = useContext(
    AppContext
  );
  const history = useHistory();

  const onStartCallback = useCallback(() => {
    setIsGameStarted(false);
    history.goBack();
  }, [setIsGameStarted, history]);

  const renderCardCallback = useCallback(() => {
    return deck.map((card, idx) => (
      <Card key={idx} {...card} onClick={() => onFlipp(idx, card)} />
    ));
  }, [deck, onFlipp]);

  return (
    <div className="main">
      <div className="header-cont">
        <div id="p-current">
          STEPS <span className="span"> {stepCount} </span>
        </div>
        <div id="p-best">
          Best <span className="best"> {bestScore} </span>
        </div>
        <Button text="reset" variant="secondary" onClick={onStartCallback} />
      </div>
      <div className="card-container">{renderCardCallback()}</div>
    </div>
  );
});

export default Main;
