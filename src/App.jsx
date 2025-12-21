import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Servant from "./pages/Servant";
import Teams from "./pages/Teams";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NavBar />
      <div className="content-div">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servant" element={<Servant />} />
          <Route path="/teams" element={<Teams />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
