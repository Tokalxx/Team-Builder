import React from "react";
import "./teams-style.css";

export default function ServantTeamCard({ servant }) {
  return (
    <div className="card-wrapper">
      <div>
        <img src={servant} />
      </div>
      <label>Role</label>
    </div>
  );
}
