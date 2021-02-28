import React, { memo } from "react";
import "./button.style.css";

export const Button = memo(({ text, variant, ...rest }) => {
  return (
    <button className={variant} {...rest}>
      <p>{text}</p>
    </button>
  );
});
