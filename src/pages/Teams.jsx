import React from "react";
import ServantTeamCard from "../components/teams/servantTeamCard";
import "../App.css";

export default function Teams() {
  return (
    <div>
      <div className="team-wrapper">
        <lable>Team Type 1 </lable>
        <lable>Team Type 2 </lable>
        <lable>Team Type 3 </lable>
        <lable>Team Type 4 </lable>
        <div className="team-grid">
          <ServantTeamCard />
          <ServantTeamCard />
          <ServantTeamCard />
          <ServantTeamCard />
          <ServantTeamCard />
          <ServantTeamCard />
        </div>
      </div>
    </div>
  );
}
