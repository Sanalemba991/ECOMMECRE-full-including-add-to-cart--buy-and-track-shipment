import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import HomeScreen from "./HomeScreen";
import data from "./Data";

function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <a href="/">Laitonjam Collection</a>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
