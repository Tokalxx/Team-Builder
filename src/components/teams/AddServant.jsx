import React from "react";
import "./teams-style.css";

export default function AddServant({ servant, onDragStart }) {
  return (
    <div>
      {}
      <div
        className="servant-card_team"
        draggable="true"
        onDragStart={(e) => onDragStart(e, servant)}
      >
        <img src={servant.image} />
        <div className="servant-card_team--details">
          <h3>{servant.name}</h3>
          <br />
          <label>{servant.role}</label>
          <br />
          <label>{servant.class}</label>
        </div>
      </div>
    </div>
  );
}
