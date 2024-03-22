import React, { useEffect, useCallback, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LanguagesPage from "./pages/LanguagePage";
import UsersPage from "./pages/userPage";

const App = function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LanguagesPage />} />
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    </Router>
  );
};

export default App;
