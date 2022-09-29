import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import userAPI from "../services/userAPI";
import CurrentUserContext from "../contexts/userContext";

export default function Login() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mail && password) {
      userAPI
        .post("/api/auth/login", { mail, password })
        .then((res) => {
          toast.success("Vous êtes connecté !");
          setUser(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
          navigate("/");
        })
        .catch(() =>
          toast.warning("Votre email ou votre mot de passe est faux")
        );
    }
  };

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
      <form onSubmit={handleSubmit}>
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
      </form>
    </div>
  );
}
