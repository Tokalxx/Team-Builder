import React from "react";
import ServantCard from "../components/servant_card";
import servantRecord from "../data/servants.json";
import "../components/styles/servant_card.css";

export default function Servant() {
  return (
    <div class="servant-grid">
      {servantRecord.map((servant) => (
        <ServantCard key={servant.id} servant={servant} />
      ))}
    </div>
  );
}
