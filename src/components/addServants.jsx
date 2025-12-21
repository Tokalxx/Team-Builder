import React, { useState, useEffect } from "react";

const serClasses = [
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
  "Beast",
];

const serRarity = ["5", "4", "3", "2", "1"];

const serRole = ["ST_DPS", "AOE_DPS", "Support", "Hybrid"];

const serCardType = ["Arts", "Quick", "Buster"];

function AddServants() {
  const [servant, setServant] = useState({
    name: "",
    class: "",
    rarity: "",
    role: "",
    cardType: "",
    skills: "",
    np: "",
    passives: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setServant((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;

    setServant((prev) => ({
      ...prev,
      [field]: checked
        ? [...prev[field], value]
        : prev[field].filter((v) => v !== value),
    }));
  };

  const handleAddServant = async (e) => {
    e.preventDefault();

    if (!servant.name || !servant.class || !servant.rarity) return;

    const newServant = {
      id: Date.now(),
      name: servant.name,
      class: servant.class,
      rarity: Number(servant.rarity),
      role: servant.role,
      cardType: servant.cardType,
      skills: servant.skills.split(",").map((s) => s.trim()),
      np: servant.np,
      passives: servant.passives.split(",").map((p) => p.trim()),
      bondLevel: null,
      image: servant.image,
    };

    try {
      await window.electronAPI.createItem(newServant);

      setServant({
        name: "",
        class: "",
        rarity: "",
        role: "",
        cardType: "",
        skills: "",
        np: "",
        passives: "",
        image: "",
      });
    } catch (error) {
      console.error("Failed to add habit:", error);
    }
  };
  return (
    <div className="add-servant-form">
      <form onSubmit={handleAddServant}>
        <input
          name="name"
          value={servant.name}
          placeholder="Name"
          onChange={handleChange}
        />

        <select name="class" value={servant.class} onChange={handleChange}>
          <option value="">Select Class</option>
          {serClasses.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          name="cardType"
          value={servant.cardType}
          onChange={handleChange}
        >
          <option value="">Select Card Type</option>
          {serCardType.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select name="role" value={servant.role} onChange={handleChange}>
          <option value="">Select Role</option>
          {serRole.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <select name="rarity" value={servant.rarity} onChange={handleChange}>
          <option value="">Select Rarity</option>
          {serRarity.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <input
          name="skills"
          value={servant.skills}
          placeholder="Skills (comma separated)"
          onChange={handleChange}
        />
        <input
          name="np"
          value={servant.np}
          placeholder="Noble Phantasm"
          onChange={handleChange}
        />
        <input
          name="passives"
          value={servant.passives}
          placeholder="Passives (comma separated)"
          onChange={handleChange}
        />
        <input
          name="image"
          value={servant.image}
          placeholder="Image URL"
          onChange={handleChange}
        />
        <button type="submit">Add Servant</button>
      </form>
    </div>
  );
}

export default AddServants;
