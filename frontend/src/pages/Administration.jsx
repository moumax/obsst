import React from "react";
import { useNavigate } from "react-router-dom";
import AllEvents from "../components/AllEvents";

function Administration() {
  const navigate = useNavigate();
  return (
    <div>
      <p>Page administration</p>
      <AllEvents />
      <button type="button" onClick={() => navigate("/")}>
        Retour à la page d'accueil
      </button>
    </div>
  );
}

export default Administration;
