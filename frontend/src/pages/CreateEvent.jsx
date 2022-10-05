import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CurrentUserContext from "../contexts/userContext";
import userAPI from "../services/userAPI";

export default function CreateEvent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [site, setSite] = useState("");
  const { user } = useContext(CurrentUserContext);

  const navigate = useNavigate();

  const createNewEvent = (e) => {
    e.preventDefault();
    if (user) {
      userAPI
        .post(`/api/events`, {
          title,
          description,
          date,
          site,
        })
        .then(() => {
          toast.success("Nouvel evenement ajouté !");
          setTitle("");
          setDescription("");
          setDate("");
          setSite("");
          navigate("/administration");
        })
        .catch((err) => {
          console.error(err);
          toast.warning("Erreur lors de l'envoi du formulaire");
        });
    } else toast.warning("Vous n'êtes pas connecté !");
  };
  return (
    <div>
      <h1>Ajouter un évènement</h1>
      <form>
        <input
          type="text"
          name="event-title"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          name="event-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Date"
          name="event-date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Site"
          name="event-site"
          value={site}
          onChange={(e) => setSite(e.target.value)}
        />
        <button type="submit" onClick={createNewEvent}>
          Ajouter cet évènement
        </button>
        <button type="submit" onClick={() => navigate("/administration")}>
          Retour à la page admin
        </button>
      </form>
    </div>
  );
}
