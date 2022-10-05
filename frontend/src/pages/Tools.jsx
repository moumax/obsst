import React from "react";
import { useNavigate } from "react-router-dom";

export default function Tools() {
  const navigate = useNavigate();

  return (
    <>
      <div>Page tools</div>{" "}
      <button type="button" onClick={() => navigate("/")}>
        Retour à la page d'accueil
      </button>
    </>
  );
}
