import React from "react";
import { useNavigate } from "react-router-dom";
import CrudEvent from "../components/CrudEvent";

function Administration() {
  const navigate = useNavigate();
  return (
    <div>
      <p>Page administration</p>
      <CrudEvent />
      <button type="button" onClick={() => navigate("/")}>
        Retour à la page d'accueil
      </button>
    </div>
  );
}

export default Administration;
