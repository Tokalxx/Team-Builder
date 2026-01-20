// electron/preload.js

const { contextBridge, ipcRenderer } = require("electron");

// Expose the CRUD methods to the renderer process
contextBridge.exposeInMainWorld("electronAPI", {
  // READ
  readItems: () => ipcRenderer.invoke("read-items"),

  // CREATE
  createItem: (newItem) => ipcRenderer.invoke("create-item", newItem),

  // UPDATE
  updateItem: (updatedItem) => ipcRenderer.invoke("update-item", updatedItem),

  // DELETE
  deleteItem: (itemId) => ipcRenderer.invoke("delete-item", itemId),

  // Read
  //readTeam: () => ipcRenderer.invoke("read-teams"),

  // Write
  createTeam: (newTeam) => ipcRenderer.invoke("create-team", newTeam),

  // Update
  //updateTeam: () => ipcRenderer.invoke("update-team", updateTeam),

  //Delete
  //deleteTeam: () => ipcRenderer.invoke("delete-team", teamId),
});
