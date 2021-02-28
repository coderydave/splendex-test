import React, { memo } from "react";
import "./dropdowns.style.css";

export const Dropdowns = memo(({ onChange, value }) => {
  return (
    <div className="dropdown">
      <label className="label" htmlFor="deck">
        Deck Size
      </label>

      <select
        className="select"
        onChange={(e) => onChange(e.target.value)}
        value={value}
        name="deck"
        id="deck"
      >
        <option value="6">6</option>
        <option value="8">8</option>
        <option value="10">10</option>
        <option value="12">12</option>
        <option value="14">14</option>
        <option value="16">16</option>
        <option value="18">18</option>
        <option value="20">20</option>
      </select>
    </div>
  );
});
