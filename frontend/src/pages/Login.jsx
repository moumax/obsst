import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // eslint-disable-next-line no-unused-vars
  const [mail, setMail] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div>
      <input
        type="text"
        id="user"
        name="user"
        placeholder="Votre email"
        onChange={(e) => setMail(e.target.value)}
      />
      <input
        type="password"
        id="pass"
        name="pass"
        placeholder="Votre mot de passe"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Se connecter</button>
      <button type="button" onClick={() => navigate("/")}>
        Retour à la page d'accueil
      </button>
    </div>
  );
}
