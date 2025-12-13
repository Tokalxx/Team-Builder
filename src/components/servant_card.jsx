import React from "react";

export default function servant_card({ servant }) {
  return (
    <div class="servant-card">
      <div class="servant-image">
        <img src="" />
      </div>
      <div class="servant-data">
        <div>{servant.name}</div>
        <div>rarity</div>
        <div>class</div>
        <div>role</div>
        <div>cardType</div>
        <div>skills</div>
        <div>np</div>
        <div>passives</div>
      </div>
    </div>
  );
}
