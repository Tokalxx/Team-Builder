import { useEffect, useState } from "react";
import ServantTeamCard from "../components/teams/ServantTeamCard";
import TeamTable from "../components/teams/TeamTable";
import AddServant from "../components/teams/AddServant";
import servantTeams from "../data/s_team.json";
import "../App.css";

export default function Teams() {
  const teams = servantTeams;

  const [slotIndex, setSlotIndex] = useState(0);
  const [servants, setServants] = useState([]);
  const [role, setRole] = useState(null);
  const [openRole, setOpenRole] = useState(false);

  const [draggedServant, setDraggedServant] = useState(null);
  const [servantCard, setServantCard] = useState([]);
  const [servantSlot, setServsantSlot] = useState({});

  const handleDragStart = (e, servant) => {
    setDraggedServant(servant);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = (slotIndex) => (e) => {
    e.preventDefault();
    if (!draggedServant) return;

    setServsantSlot((prev) => ({
      ...prev,
      [slotIndex]: draggedServant,
    }));

    setDraggedServant(null);
  };

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

  <div className="slot-grid">
    {teams[slotIndex]?.Slots.map((role, index) => (
      <ServantTeamCard
        key={index}
        slotKey={`slot-${index + 1}`}
        role={role}
        servantInSlot={servantSlot[index]} // shows the dropped servant
        onClick={() => {
          setRole(role);
          setOpenRole(true);
        }}
        onDragOver={(e) => e.preventDefault()} // allows dropping
        onDrop={handleDrop(index)} // slot-aware drop
      />
    ))}
  </div>;

  return (
    <div>
      <div className="team-wrapper">
        {teams.map((team, index) => (
          <label key={team.id} onClick={() => setSlotIndex(index)}>
            {team.name}
          </label>
        ))}
        <div className="slot-grid">
          {/* Dropzone */}
          {teams[slotIndex].Slots.map((role, index) => (
            <ServantTeamCard
              key={index}
              slotKey={`slot-${index + 1}`}
              role={role}
              onClick={() => {
                setRole(role);
                setOpenRole(true);
                onDragOver((e) => e.preventDefault());
                onDrop = { handleDrop };
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
              return (
                <AddServant
                  key={servant.id}
                  servant={servant}
                  onDragStart={handleDragStart}
                />
              );
            })}
      </div>
    </div>
  );
}
