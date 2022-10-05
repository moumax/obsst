import React from "react";
import { useNavigate } from "react-router-dom";

import AllCameras from "../components/AllCameras";

export default function Tools() {
  const navigate = useNavigate();

  return (
    <>
      <div>Page tools</div> <AllCameras />
      <button type="button" onClick={() => navigate("/")}>
        Retour à la page d'accueil
      </button>
    </>
  );
}
