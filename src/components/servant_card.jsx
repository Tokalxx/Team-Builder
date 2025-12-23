import React from "react";
import "./styles/servant_card.css";

export default function servant_card({ servant, onDelete, onEdit }) {
  return (
    <div className="servant-card">
      <div className="servant-image">
        <img src={servant.image} />
      </div>
      <div className="servant-data">
        <div>{servant.name}</div>
        <div>{servant.class}</div>
        <button className="delete_servant" onClick={() => onDelete(servant.id)}>
          X
        </button>
        <button className="update_servant" onClick={onEdit}>
          UP
        </button>
      </div>
    </div>
  );
}
