// import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Table_in_React from "./homeworks/Table_in_React/App";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/homeworks/table-in-react" element={<Table_in_React />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
