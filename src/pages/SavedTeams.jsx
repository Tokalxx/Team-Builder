import { useEffect, useState } from "react";
import SavedTeamCard from "../components/savedTeams/savedTeamCards";
import "./Page_Style/SavedTeams.css";
export default function SavedTeams() {
  const [teams, setTeams] = useState([]);

  const loadTeams = async () => {
    try {
      const data = await window.electronAPI.readTeams();
      setTeams(data);
    } catch (error) {
      console.log("Failed to load teams", error);
    }
  };

  useEffect(() => {
    loadTeams();
  }, []);

  return (
    <div className="team_slots">
      <div className="slots">
        {teams.map((team) => (
          <SavedTeamCard key={team.id} team={team} onDelete={loadTeams} />
        ))}
      </div>
    </div>
  );
}
