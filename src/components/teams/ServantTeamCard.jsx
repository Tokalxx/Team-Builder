import React from "react";
import { useDroppable } from "@dnd-kit/core";
import "./teams-style.css";

export default function ServantTeamCard({
  slotKey,
  role,
  onClick,
  onDragOver,
  onDrop,
  servantInSlot,
  slotIndex,
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: slotKey,
    data: { slotIndex },
  });

  return (
    <div
      ref={setNodeRef}
      className={`card-wrapper ${isOver ? "is-over" : ""}`}
      onClick={onClick}
    >
      <div className="card-role">{role}</div>

      <img
        className="card-image"
        src={servantInSlot?.image}
        alt={servantInSlot?.name || "Empty slot"}
      />

      <div className="card-name">{servantInSlot?.name || "N/A"}</div>

      <div className="card-class">{servantInSlot?.class || ""}</div>
    </div>
  );
}
