import React from "react";
import "./teams-style.css";

export default function AddServant({ servant }) {
  return (
    <div>
      {}
      <div className="servant-card_team">
        <img src={servant.image} />
        <div className="servant-card_team--details">
          <h3>{servant.name}</h3>
          <br />
          <label>{servant.role.join}</label>
          <br />
          <label>Card Type</label>
        </div>
      </div>
    </div>
  );
}
