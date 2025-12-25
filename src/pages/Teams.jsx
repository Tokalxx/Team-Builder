import React from "react";
import ServantTeamCard from "../components/teams/servantTeamCard";
import TeamTable from "../components/teams/TeamTable";
import "../App.css";

export default function Teams() {
  //Trying to create a function that will return an array of servants that match
  //the role of the clicked slot
  const handleGetServant = async () => {
    try {
      const data = await window.electronAPI.readItems();
    } catch (error) {
      console.log("Failed to load servants", error);
    }
  };
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
        <div className="team-table">
          <TeamTable />
        </div>
      </div>
    </div>
  );
}
