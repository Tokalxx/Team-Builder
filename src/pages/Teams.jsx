import React from "react";
import AddServants from "../components/addServants";

export default function Teams() {
  const saveTeam = () => {
    const teamData = {
      team: "Hello World",
    };

    window.fileAPI.saveJSON("s_team", teamData);
  };
  return (
    <div>
      <AddServants />
      <p>Team number 03</p>
      <button onClick={saveTeam}>Save Team</button>
    </div>
  );
}
