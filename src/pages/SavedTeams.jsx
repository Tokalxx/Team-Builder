import React from "react";
import ServantTeamCard from "../components/teams/ServantTeamCard";

export default function SavedTeams() {
  //const [teams, setTeams] = useState([]);
  return (
    <div>
      <div className="team_slots">
        <div className="slots">
          {[...Array(6)].map((role, index) => (
            <ServantTeamCard />
          ))}
        </div>
      </div>
    </div>
  );
}
