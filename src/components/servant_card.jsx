import React from "react";
import "./styles/servant_card.css";

export default function servant_card({ servant }) {
  return (
    <div class="servant-card">
      <div class="servant-image">
        <img src={servant.image} />
      </div>
      <div class="servant-data">
        <div>{servant.name}</div>
        <div>{servant.class}</div>
      </div>
    </div>
  );
}
