import React from "react";

import "./App.css";
import AppContent from "./components/AppContent";

// Context staff
import AppContext from "./data/AppContext";

function App() {
  return (
    <AppContext>
      <AppContent />
    </AppContext>
  );
}

export default App;
