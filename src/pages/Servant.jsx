import React, { useEffect, useState } from "react";
import ServantCard from "../components/servant_card";
import UpdateServant from "../components/updateServant";
import Modal from "../components/Modal";

export default function Servant() {
  const [servants, setServants] = useState([]);
  const [editingServant, setEditingServant] = useState(null);

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

  const handleDelete = async (id) => {
    try {
      await window.electronAPI.deleteItem(id);
      setServants((prev) => prev.filter((s) => s.id !== id));
    } catch (error) {
      console.log("Failed to delete: ", error);
    }
  };
  const handleUpdate = async (updated) => {
    try {
      await window.electronAPI.updateItem(updated);
      setServants((prev) =>
        prev.map((s) => (s.id === updated.id ? updated : s))
      );
    } catch (error) {
      console.log("Failed to update: ", error);
    }

    setEditingServant(null);
  };

  return (
    <div className="servant-grid">
      {servants.map((servant) => (
        <ServantCard
          key={servant.id}
          servant={servant}
          onDelete={handleDelete}
          onEdit={() => setEditingServant(servant)}
        />
      ))}

      {editingServant && (
        <Modal onClose={() => setEditingServant(null)}>
          <UpdateServant
            servant={editingServant}
            onSave={handleUpdate}
            onCancel={() => setEditingServant(null)}
          ></UpdateServant>
        </Modal>
      )}
    </div>
  );
}
