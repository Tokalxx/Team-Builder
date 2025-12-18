// preload.js
import { contextBridge } from "electron"; // only contextBridge
import fs from "fs";
import path from "path";

// Use a folder relative to preload.js
const dataDir = path.join(__dirname, "data");

// Ensure folder exists
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

contextBridge.exposeInMainWorld("fileAPI", {
  saveJSON: (filename, data) => {
    const filePath = path.join(dataDir, `${filename}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  },
  readJSON: (filename) => {
    const filePath = path.join(dataDir, `${filename}.json`);
    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  },
  listJSON: () =>
    fs
      .readdirSync(dataDir)
      .filter((f) => f.endsWith(".json"))
      .map((f) => f.replace(".json", "")),
});
