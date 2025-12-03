import { useState } from "react";
import reactLogo from "./assets/react.svg";
import servantRecord from "./data/servants.json"; //Temp import
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        {servantRecord.map((servant) => {
          return (
            <div>
              <p>Class: {servant.class}</p>
              <p>Name: {servant.name}</p>
              <p>Rarity: {servant.rarity}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
