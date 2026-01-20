import { useEffect, useState } from "react";
import ServantTeamCard from "../components/teams/ServantTeamCard";
import AddServant from "../components/teams/AddServant";
import servantTeams from "../data/s_team.json";
import { DndContext, closestCenter } from "@dnd-kit/core";
import "../App.css";

export default function Teams() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [servants, setServants] = useState([]);
  const [role, setRole] = useState(null);
  const [openRole, setOpenRole] = useState(false);
  const [servantSlots, setServantSlots] = useState({});
  const [savedTeam, setSavedTeam] = useState({});

  const RoleList = ["ST DPS", "AOE DPS", "Sustain", "Support", "Anchor"];

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
    const slotIndex = over.id;

    if (servant && slotIndex !== undefined) {
      setServantSlots((prev) => ({
        ...prev,
        [slotIndex]: servant,
      }));
    }
  }

  const handleSaveTeam = async () => {
    const team = {
      role,
      slots: servantSlots,
      createdAt: new Date().toISOString(),
    };

    setSavedTeam(team);

    try {
      await window.electronAPI.createTeam(team);
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div>
      <div className="team-wrapper">
        {RoleList.map((role, index) => (
          <label
            key={role}
            onClick={() => {
              setRoleIndex(index);
              setRole(role);
              setOpenRole(true);
            }}
          >
            {role}
          </label>
        ))}

        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="slot-grid">
            {[...Array(6)].map((role, index) => (
              <ServantTeamCard
                key={index}
                slotKey={`slot-${index}`}
                slotIndex={index}
                role={role}
                servantInSlot={servantSlots[index]}
              />
            ))}
          </div>
          <div className="button-wrapper">
            <button className="save-button" onClick={handleSaveTeam}>
              Save Team
            </button>
          </div>

          <div className="openRole-wrapper">
            {openRole && (
              <>
                <button onClick={() => setOpenRole(false)}>X</button>
                {servants
                  .filter((s) =>
                    String(s.role)
                      .toLowerCase()
                      .includes(String(role).toLowerCase()),
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
