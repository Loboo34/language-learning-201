import React, { useEffect, useCallback, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import UsersPage from "./pages/LanguagePage";
import LanguagePage from "./pages/LanguagePage";

const App = function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LanguagePage />} />
        {/* <Route path="/users" element={<UsersPage/>} /> */}
        
      </Routes>
    </Router>
  );
};

export default App;
