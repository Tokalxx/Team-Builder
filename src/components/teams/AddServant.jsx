import React from "react";
import { useDraggable } from "@dnd-kit/core";
import "./teams-style.css";

export default function AddServant({ servant, onDragStart }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: servant.id,
    data: { servant },
  });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;
  return (
    <div className="servant-wrapper">
      <div
        className="servant-card_team"
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
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
