import React from "react";
import "./teams-style.css";

export default function ServantTeamCard({ slotKey, role, onClick }) {
  return (
    <div className="card-wrapper" onClick={onClick}>
      <div>{role}</div>
      <div>Servant Name</div>
    </div>
  );
}
