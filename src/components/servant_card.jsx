import React from "react";
import "./styles/servant_card.css";

export default function servant_card({ servant, onDelete, onEdit }) {
  return (
    <div className="servant-card">
      <div className="servant-image">
        <img src={servant.image} alt={servant.name} />
      </div>

      <div className="servant-data">
        <div className="servant-name">{servant.name}</div>
        <div className="servant-class">{servant.class}</div>

        <div className="servant-actions">
          <button className="update_servant" onClick={onEdit}>
            Update
          </button>
          <button
            className="delete_servant"
            onClick={() => onDelete(servant.id)}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
