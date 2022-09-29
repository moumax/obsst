import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Administration from "./pages/Administration";
import Events from "./pages/Events";

import { CurrentUserContextProvider } from "./contexts/userContext";

function App() {
  return (
    <CurrentUserContextProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/administration" element={<Administration />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </div>
    </CurrentUserContextProvider>
  );
}

export default App;
