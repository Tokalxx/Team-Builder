import React, { useState } from "react";

export default function UpdateServant({ servant, onSave }) {
  const [editedServant, setEditedServant] = useState(servant);

  return (
    <form className="servant-edit-form">
      {/* Name */}
      <label>
        Name
        <input
          type="text"
          value={editedServant.name}
          onChange={(e) =>
            setEditedServant({ ...editedServant, name: e.target.value })
          }
        />
      </label>

      {/* Class */}
      <label>
        Class
        <select
          value={editedServant.class}
          onChange={(e) =>
            setEditedServant({ ...editedServant, class: e.target.value })
          }
        >
          {[
            "Saber",
            "Archer",
            "Lancer",
            "Rider",
            "Caster",
            "Assassin",
            "Berserker",
            "Ruler",
            "Avenger",
            "Alter Ego",
            "Moon Cancer",
            "Foreigner",
            "Pretender",
            "Shielder",
          ].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </label>

      {/* Rarity */}
      <label>
        Rarity
        <select
          value={editedServant.rarity}
          onChange={(e) =>
            setEditedServant({
              ...editedServant,
              rarity: Number(e.target.value),
            })
          }
        >
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r} ★
            </option>
          ))}
        </select>
      </label>

      {/* Card Type */}
      <label>
        Card Type
        <select
          value={editedServant.cardType}
          onChange={(e) =>
            setEditedServant({ ...editedServant, cardType: e.target.value })
          }
        >
          <option value="">Select</option>
          <option>Arts</option>
          <option>Buster</option>
          <option>Quick</option>
        </select>
      </label>

      {/* Noble Phantasm */}
      <label>
        Noble Phantasm
        <input
          type="text"
          value={editedServant.np}
          onChange={(e) =>
            setEditedServant({ ...editedServant, np: e.target.value })
          }
        />
      </label>

      {/* Skills */}
      <fieldset>
        <legend>Skills</legend>
        {editedServant.skills.map((skill, index) => (
          <input
            key={index}
            type="text"
            value={skill}
            onChange={(e) => {
              const updated = [...editedServant.skills];
              updated[index] = e.target.value;
              setEditedServant({ ...editedServant, skills: updated });
            }}
          />
        ))}
      </fieldset>

      {/* Passives */}
      <fieldset>
        <legend>Passives</legend>
        {editedServant.passives.map((passive, index) => (
          <input
            key={index}
            type="text"
            value={passive}
            onChange={(e) => {
              const updated = [...editedServant.passives];
              updated[index] = e.target.value;
              setEditedServant({ ...editedServant, passives: updated });
            }}
          />
        ))}
      </fieldset>

      {/* Image */}
      <label>
        Image URL
        <input
          type="text"
          value={editedServant.image}
          onChange={(e) =>
            setEditedServant({ ...editedServant, image: e.target.value })
          }
        />
      </label>

      {/* Save */}
      <button type="button" onClick={() => onSave(editedServant)}>
        Save Changes
      </button>
    </form>
  );
}
