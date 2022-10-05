import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Administration from "./pages/Administration";
import Events from "./pages/Events";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";

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
          <Route
            path="/administration/create-event"
            element={<CreateEvent />}
          />
          <Route
            path="/administration/edit-event/:id"
            element={<EditEvent />}
          />
        </Routes>
      </div>
    </CurrentUserContextProvider>
  );
}

export default App;
