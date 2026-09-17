// import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Table_in_React from "./homeworks/Table_in_React/App";
import Shop from "./homeworks/Shop/App";
import Counter from "./homeworks/Counter/App"
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table" element={<Table_in_React />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/counter" element={<Counter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
