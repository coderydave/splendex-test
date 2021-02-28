import React, { memo, useContext, useMemo } from "react";
import { AppContext } from "../../context/AppContext";
import "./card.style.css";

export const Card = memo(({ image, flipped, ...rest }) => {
  const { flippedPairs } = useContext(AppContext);

  const indexes = useMemo(() => {
    return flippedPairs.map((card) => card.tag);
  }, [flippedPairs]);

  const style = useMemo(() => {
    if (indexes.includes(rest.tag)) {
      return "card card-eltalalt";
    } else {
      return "card";
    }
  }, [indexes, rest]);

  return (
    <div className={style} {...rest}>
      {flipped && <img src={image} alt="card" />}
    </div>
  );
});
