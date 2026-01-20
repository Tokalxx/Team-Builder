const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

app.setName("team_builder");
const dataServant = path.join(app.getPath("userData"), "servants.json");
const dataTeams = path.join(app.getPath("userData"), "teams.json");
console.log(dataServant);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  const isDev = !app.isPackaged;
  if (isDev) {
    mainWindow.loadURL("http://localhost:5173");
    mainWindow.webContents.openDevTools();
  }
  elsemainWindow.loadFile("../dist/index.html");
  {
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

//update Data
ipcMain.handle("update-item", (event, updatedItem) => {
  try {
    let items = [];
    if (fs.existsSync(dataServant)) {
      const data = fs.readFileSync(dataServant, "utf8");
      items = JSON.parse(data);
    }

    const index = items.findIndex((item) => item.id === updatedItem.id);
    if (index !== -1) {
      items[index] = updatedItem;
      fs.writeFileSync(dataServant, JSON.stringify(items, null, 2));
      return updatedItem;
    }
    return null;
  } catch (error) {
    console.error("Failed to update item:", error);
    throw error;
  }
});

//Delete Data
ipcMain.handle("delete-item", (event, itemId) => {
  try {
    let items = [];
    if (fs.existsSync(dataServant)) {
      const data = fs.readFileSync(dataServant, "utf8");
      items = JSON.parse(data);
    }
    const newItems = items.filter((item) => item.id !== itemId);
    fs.writeFileSync(dataServant, JSON.stringify(newItems, null, 2));
    return true;
  } catch (error) {
    console.error("Failed to delete item:", error);
    throw error;
  }
});

//Create Data
ipcMain.handle("create-item", (event, newItem) => {
  try {
    let items = [];
    if (fs.existsSync(dataServant)) {
      const data = fs.readFileSync(dataServant, "utf8");
      items = JSON.parse(data);
    }
    newItem.id = Date.now();
    items.push(newItem);
    fs.writeFileSync(dataServant, JSON.stringify(items, null, 2));
    return newItem;
  } catch (error) {
    console.error("Failed to create item:", error);
    throw error;
  }
});

//Raed Data
ipcMain.handle("read-items", () => {
  try {
    let items = [];
    if (fs.existsSync(dataServant)) {
      const data = fs.readFileSync(dataServant, "utf8");
      items = JSON.parse(data);
    }

    return items;
  } catch (error) {
    console.error("Failed to read items:", error);
    return [];
  }
});

// Create Team Data
ipcMain.handle("create-team", (event, newTeam) => {
  try {
    let team = [];
    if (fs.existsSync(dataTeams)) {
      const data = fs.readFileSync(dataTeams, "utf8");
      team = JSON.parse(data);
    }
    newTeam.id = Date.now();
    team.push(newTeam);
    fs.writeFileSync(dataTeams, JSON.stringify(team, null, 2));
    return newTeam;
  } catch (error) {
    console.error("Failed to create team:", error);
    throw error;
  }
});

// read Team Data

// Update Team Data

// Delete Team Data
