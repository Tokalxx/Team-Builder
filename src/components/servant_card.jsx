import React from "react";

export default function servant_card({ servant }) {
  return (
    <div class="servant-card">
      <div class="servant-image">
        <img src={servant.image} />
      </div>
      <div class="servant-data">
        <div>{servant.name}</div>
        <div>{servant.rarity}</div>
        <div>{servant.class}</div>
        <div>{servant.role}</div>
        <div>{servant.cardType}</div>
        <div>{servant.skills[0]}</div>
        <div>{servant.np}</div>
        <div>{servant.passives[0]}</div>
      </div>
    </div>
  );
}
