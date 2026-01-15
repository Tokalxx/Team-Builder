import React from "react";
import "./teams-style.css";

export default function AddServant({ servant, onDragStart }) {
  return (
    <div className="servant-wrapper">
      <div
        className="servant-card_team"
        draggable="true"
        onDragStart={(e) => onDragStart(e, servant)}
      >
        <img
          className="servant-card_team--image"
          src={servant.image}
          alt={servant.name}
        />

        <div className="servant-card_team--details">
          <h3 className="servant-card_team--name">{servant.name}</h3>

          <label className="servant-card_team--role">{servant.role}</label>

          <label className="servant-card_team--class">{servant.class}</label>
        </div>
      </div>
    </div>
  );
}
