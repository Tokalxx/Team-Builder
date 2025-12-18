import React from "react";

export default function Teams() {
  const saveTeam = () => {
    const teamData = {
      team: "Hello World",
    };

    window.fileAPI.saveJSON("s_team.json", teamData);
  };
  return (
    <div>
      <p>Team number 03</p>
      <button onClick={saveTeam}>Save Team</button>
    </div>
  );
}
