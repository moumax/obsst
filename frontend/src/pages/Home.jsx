import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { toast } from "react-toastify";
import userAPI from "../services/userAPI";

import CurrentUserContext from "../contexts/userContext";

export default function Home() {
  const { user, setUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  const handleDisconnect = () => {
    userAPI
      .get("api/auth/logout")
      .then(() => {
        localStorage.clear();
        setUser(undefined);
        navigate("/");
        toast.warning("Vous êtes déconnecté !");
      })
      .catch((err) => {
        console.error("La déconnexion ne fonctionne pas");
        console.error(err.message);
      });
  };

  return (
    <div>
      <h1>Bienvenue sur le site de l'observatoire de Saint Jean Le Blanc</h1>
      {!user && (
        <button type="button" onClick={() => navigate("/login")}>
          Log
        </button>
      )}

      <button type="button" onClick={() => navigate("/events")}>
        Events
      </button>
      <button type="button" onClick={() => navigate("/administration")}>
        Administration
      </button>
      <button type="button" onClick={() => navigate("/tools")}>
        Tools
      </button>
      {user && (
        <button
          type="button"
          onClick={() => {
            handleDisconnect();
          }}
        >
          Déconnection
        </button>
      )}
    </div>
  );
}
