import React, { useState, useEffect } from "react";

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

  const handleAddServant = async (e) => {
    e.preventDefault();

    const newServant = {
      id: Date.now(),
      name: servant.name,
      class: servant.class,
      rarity: Number(servant.number),
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
    } catch (error) {
      console.error("Failed to add habit:", error);
    }
  };
  return (
    <form onSubmit={handleAddServant}>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="class" placeholder="Class" onChange={handleChange} />
      <input name="rarity" type="number" onChange={handleChange} />
      <input name="role" placeholder="Role" onChange={handleChange} />
      <input name="cardType" placeholder="Card Type" onChange={handleChange} />
      <input
        name="skills"
        placeholder="Skills (comma separated)"
        onChange={handleChange}
      />
      <input name="np" placeholder="Noble Phantasm" onChange={handleChange} />
      <input
        name="passives"
        placeholder="Passives (comma separated)"
        onChange={handleChange}
      />
      <input name="image" placeholder="Image URL" onChange={handleChange} />
      <button type="submit">Add Servant</button>
    </form>
  );
}

export default AddServants;
