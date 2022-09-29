import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Bienvenue sur le site de l'observatoire de Saint Jean Le Blanc</h1>
      <button type="button" onClick={() => navigate("/login")}>
        Log
      </button>
      <button type="button" onClick={() => navigate("/events")}>
        Events
      </button>
    </div>
  );
}
