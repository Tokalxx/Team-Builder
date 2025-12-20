import React, { useEffect, useState } from "react";
import ServantCard from "../components/servant_card";
import "../components/styles/servant_card.css";

export default function Servant() {
  const [servants, setServants] = useState([]);

  useEffect(() => {
    const loadServants = async () => {
      try {
        const data = await window.electronAPI.readItems();
        setServants(data);
      } catch (error) {
        console.error("Failed to load servants", error);
      }
    };

    loadServants();
  }, []);
  return (
    <div class="servant-grid">
      {servants.map((servant) => (
        <ServantCard key={servant.id} servant={servant} />
      ))}
    </div>
  );
}
