import { useEffect, useState } from "react";
import ServantTeamCard from "../components/teams/ServantTeamCard";
import AddServant from "../components/teams/AddServant";
import servantTeams from "../data/s_team.json";
import { DndContext, closestCenter } from "@dnd-kit/core";
import "../App.css";

export default function Teams() {
  const teams = servantTeams;

  const [slotIndex, setSlotIndex] = useState(0);
  const [servants, setServants] = useState([]);
  const [role, setRole] = useState(null);
  const [openRole, setOpenRole] = useState(false);
  const [servantSlots, setServantSlots] = useState({});

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

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;

    const servant = active.data.current?.servant;
    const slotIndex = over.data.current?.slotIndex;

    if (servant && slotIndex !== undefined) {
      setServantSlots((prev) => ({
        ...prev,
        [slotIndex]: servant,
      }));
    }
  }

  return (
    <div>
      <div className="team-wrapper">
        {teams.map((team, index) => (
          <label key={team.id} onClick={() => setSlotIndex(index)}>
            {team.name}
          </label>
        ))}

        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="slot-grid">
            {teams[slotIndex].Slots.map((role, index) => (
              <ServantTeamCard
                key={index}
                slotKey={`slot-${index}`}
                slotIndex={index}
                role={role}
                servantInSlot={servantSlots[index]}
                onClick={() => {
                  setRole(role);
                  setOpenRole(true);
                }}
              />
            ))}
          </div>

          <div className="openRole-wrapper">
            {openRole && (
              <>
                <button onClick={() => setOpenRole(false)}>X</button>
                {servants
                  .filter((s) =>
                    String(s.role)
                      .toLowerCase()
                      .includes(String(role).toLowerCase())
                  )
                  .map((servant) => (
                    <AddServant key={servant.id} servant={servant} />
                  ))}
              </>
            )}
          </div>
        </DndContext>
      </div>
    </div>
  );
}
