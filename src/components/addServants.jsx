import { useEffect, useState } from "react";
import getServantByName from "../hook/getServantByName";
import "./styles/AddServant.css";

export default function AddServants() {
  const [name, setName] = useState("");
  const { servant, loading, error } = getServantByName(name);
  const [savedMessage, setSavedMessage] = useState("");
  const [filterServants, setFilterServants] = useState([]);

  useEffect(() => {
    handleLoadServant();
  });

  const handleSave = async (s) => {
    try {
      await window.electronAPI.createItem(s);
      setSavedMessage(`Saved ${s.name} successfully!`);
    } catch (err) {
      setSavedMessage(`Error saving ${s.name}: ${err.message}`);
    }
  };

  const handleLoadServant = async () => {
    try {
      const data = await window.electronAPI.readItems();
      setFilterServants(data);
    } catch (error) {
      console.log("Failed to load servants", error);
    }
  };

  return (
    <div className="add-servants">
      {/* Search Input */}
      <input
        className="servant-search-input"
        type="text"
        placeholder="Enter servant name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Status Messages */}
      {loading && <p className="servant-loading">Loading...</p>}
      {error && <p className="servant-error">Error: {error}</p>}
      {savedMessage && <p className="servant-saved-message">{savedMessage}</p>}

      {/* Servant List */}
      {!loading && servant.length > 0 && (
        <div className="servant-list">
          {servant
            .filter((s) => !filterServants.some((fs) => fs.name === s.name))
            .map((s) => (
              <div key={s.id} className="servant-card">
                {/* Image */}
                {s.image && (
                  <div className="servant-image">
                    <img src={s.image} alt={s.name} />
                  </div>
                )}

                <h2 className="servant-name">{s.name}</h2>

                <p className="servant-class">
                  <strong>Class:</strong> {s.class}
                </p>

                <p className="servant-rarity">
                  <strong>Rarity:</strong> ⭐{s.rarity}
                </p>

                <p className="servant-card-type">
                  <strong>Card Type:</strong> {s.cardType}
                </p>

                <p className="servant-role">
                  <strong>Role:</strong> {s.role.join(", ")}
                </p>

                <p className="servant-np">
                  <strong>Noble Phantasm:</strong> {s.np}
                </p>

                {/* Skills */}
                <div className="servant-skills">
                  <strong>Skills:</strong>
                  <ul>
                    {s.skills.map((skill) => (
                      <li key={skill} className="servant-skill">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Passives */}
                <div className="servant-passives">
                  <strong>Passives:</strong>
                  <ul>
                    {s.passives.map((passive) => (
                      <li key={passive} className="servant-passive">
                        {passive}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  className="servant-save-button"
                  onClick={() => handleSave(s)}
                >
                  Save Servant
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
