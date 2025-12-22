import { useState } from "react";
import getServantByName from "../hook/getServantByName";

export default function AddServants() {
  const [name, setName] = useState("");
  const { servant, loading, error } = getServantByName(name);
  const [savedMessage, setSavedMessage] = useState("");

  const handleSave = async (s) => {
    try {
      await window.electronAPI.createItem(s);
      setSavedMessage(`Saved ${s.name} successfully!`);
    } catch (err) {
      setSavedMessage(`Error saving ${s.name}: ${err.message}`);
    }
  };

  return (
    <div>
      {/* Search Input */}
      <input
        type="text"
        placeholder="Enter servant name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Loading & Error */}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {/* Servant Data */}
      {!loading && servant.length > 0 && (
        <div>
          {servant.map((s) => (
            <div
              key={s.id}
              style={{
                border: "1px solid #ccc",
                margin: "1rem",
                padding: "1rem",
              }}
            >
              {/* Image */}
              {s.image && <img src={s.image} alt={s.name} width="150" />}

              <h2>{s.name}</h2>

              <p>
                <strong>Class:</strong> {s.class}
              </p>

              <p>
                <strong>Rarity:</strong> ⭐{s.rarity}
              </p>

              <p>
                <strong>Card Type:</strong> {s.cardType}
              </p>

              <p>
                <strong>Noble Phantasm:</strong> {s.np}
              </p>

              {/* Skills */}
              <div>
                <strong>Skills:</strong>
                <ul>
                  {s.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>

              {/* Passives */}
              <div>
                <strong>Passives:</strong>
                <ul>
                  {s.passives.map((passive) => (
                    <li key={passive}>{passive}</li>
                  ))}
                </ul>
              </div>

              {/*Save Button */}
              <button onClick={() => handleSave(s)}>Save Servant</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
