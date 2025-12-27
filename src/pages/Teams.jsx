import { useEffect, useState } from "react";
import ServantTeamCard from "../components/teams/servantTeamCard";
import TeamTable from "../components/teams/TeamTable";
import AddServant from "../components/teams/AddServant";
import teamData from "../data/teams.json";
import "../App.css";

export default function Teams() {
  const teams = teamData;
  const slotIndex = 0;

  const [servants, setServants] = useState([]);
  const [role, setRole] = useState(teams[slotIndex].slots.slot1.role);
  const [openRole, setOpenRole] = useState(false);

  //Trying to create a function that will return an array of servants that match
  //the role of the clicked slot
  useEffect(() => {
    const loadServants = async () => {
      try {
        const data = await window.electronAPI.readItems();
        setServants(data);
      } catch (error) {
        console.log("Failed to load servants", error);
      }
    };

    loadServants();
  }, []);

  return (
    <div>
      <div className="team-wrapper">
        {teams.map((team) => (
          <label key={team.id}> {team.name} </label>
        ))}
        <div className="slot-grid">
          {Object.entries(teams[slotIndex].slots).map(([slotKey, slotData]) => (
            <ServantTeamCard
              key={slotKey}
              slotKey={slotKey}
              role={slotData.role}
              onClick={() => {
                setRole(slotData.role);
                setOpenRole(true);
              }}
            />
          ))}
        </div>
        <div className="team-table"></div>
      </div>

      <div className="openRole-wrapper">
        <button onClick={() => setOpenRole(false)}>X</button>
        {openRole &&
          servants
            .filter((s) =>
              String(s.role).toLowerCase().includes(String(role).toLowerCase())
            )
            .map((servant) => {
              console.log(
                servant.name,
                "List of filtered servants",
                servant.role
              );
              return <AddServant key={servant.id} servant={servant} />;
            })}
      </div>
    </div>
  );
}
