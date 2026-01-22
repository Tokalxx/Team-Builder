import React from "react";

export default function SavedTeamCard({ team, onDelete }) {
  const handleDelete = async (id) => {
    try {
      await window.electronAPI.deleteTeam(id);
      onDelete();
    } catch (error) {
      console.log("Failed to delete team", error);
    }
  };
  return (
    <div className="saved-team-card">
      <div className="saved-team-header">
        <h3 className="saved-team-title">{team.role} Team</h3>
        <span className="saved-team-date">
          {new Date(team.createdAt).toLocaleString()}
        </span>
        <button className="delete-button" onClick={() => handleDelete(team.id)}>
          X
        </button>
      </div>

      <div className="saved-team-slots">
        {Object.entries(team.slots).map(([slotIndex, servant]) => (
          <div key={slotIndex} className="saved-slot-card">
            <div className="saved-slot-role">
              {Array.isArray(servant.role)
                ? servant.role.join(", ")
                : servant.role}
            </div>

            <img
              className="saved-slot-image"
              src={servant.image}
              alt={servant.name}
            />

            <div className="saved-slot-name">{servant.name}</div>
            <div className="saved-slot-class">
              {servant.class} ⭐{servant.rarity}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
