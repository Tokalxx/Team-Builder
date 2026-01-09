import React from "react";
import "./teams-style.css";

export default function ServantTeamCard({
  slotKey,
  role,
  onClick,
  onDragOver,
  onDrop,
  servantInSlot,
}) {
  return (
    <div
      className="card-wrapper"
      onClick={onClick}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div>{role}</div>
      <div>{servantInSlot?.name || "N/A"}</div>
    </div>
  );
}
