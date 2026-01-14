import React, { useState } from "react";
import "./styles/update_servant.css";

export default function UpdateServant({ servant, onSave }) {
  const [editedServant, setEditedServant] = useState(servant);

  return (
    <form className="servant-edit">
      {/* Name */}
      <label className="servant-edit__field">
        <span className="servant-edit__label">Name</span>
        <input
          className="servant-edit__input"
          type="text"
          value={editedServant.name}
          onChange={(e) =>
            setEditedServant({ ...editedServant, name: e.target.value })
          }
        />
      </label>

      {/* Class */}
      <label className="servant-edit__field">
        <span className="servant-edit__label">Class</span>
        <select
          className="servant-edit__select"
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
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      {/* Role */}
      <label className="servant-edit__field">
        <span className="servant-edit__label">Role</span>
        <input
          className="servant-edit__input"
          type="text"
          value={editedServant.role}
          onChange={(e) =>
            setEditedServant({ ...editedServant, role: e.target.value })
          }
        />
      </label>

      {/* Rarity */}
      <label className="servant-edit__field">
        <span className="servant-edit__label">Rarity</span>
        <select
          className="servant-edit__select"
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
      <label className="servant-edit__field">
        <span className="servant-edit__label">Card Type</span>
        <select
          className="servant-edit__select"
          value={editedServant.cardType}
          onChange={(e) =>
            setEditedServant({ ...editedServant, cardType: e.target.value })
          }
        >
          <option value="">Select</option>
          <option value="Arts">Arts</option>
          <option value="Buster">Buster</option>
          <option value="Quick">Quick</option>
        </select>
      </label>

      {/* Noble Phantasm */}
      <label className="servant-edit__field">
        <span className="servant-edit__label">Noble Phantasm</span>
        <input
          className="servant-edit__input"
          type="text"
          value={editedServant.np}
          onChange={(e) =>
            setEditedServant({ ...editedServant, np: e.target.value })
          }
        />
      </label>

      {/* Skills */}
      <fieldset className="servant-edit__group">
        <legend className="servant-edit__legend">Skills</legend>
        {editedServant.skills.map((skill, index) => (
          <input
            key={index}
            className="servant-edit__input servant-edit__input--group"
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
      <fieldset className="servant-edit__group">
        <legend className="servant-edit__legend">Passives</legend>
        {editedServant.passives.map((passive, index) => (
          <input
            key={index}
            className="servant-edit__input servant-edit__input--group"
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
      <label className="servant-edit__field">
        <span className="servant-edit__label">Image URL</span>
        <input
          className="servant-edit__input"
          type="text"
          value={editedServant.image}
          onChange={(e) =>
            setEditedServant({ ...editedServant, image: e.target.value })
          }
        />
      </label>

      {/* Save */}
      <button
        type="button"
        className="servant-edit__button servant-edit__button--save"
        onClick={() => onSave(editedServant)}
      >
        Save Changes
      </button>
    </form>
  );
}
