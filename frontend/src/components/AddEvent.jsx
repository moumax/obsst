import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import CurrentUserContext from "../contexts/userContext";
import userAPI from "../services/userAPI";
import Event from "./Event";

export default function AddEvent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [site, setSite] = useState("");

  const { user } = useContext(CurrentUserContext);

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
        })
        .catch((err) => {
          console.error(err);
          toast.warning("Erreur lors de l'envoi du formulaire");
        });
    } else toast.warning("Vous n'êtes pas connecté !");
  };

  return (
    <div>
      <p>Composant add Event</p>
      <Event />
      <form>
        <input
          type="text"
          name="event-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          name="event-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          name="event-date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="text"
          name="event-site"
          value={site}
          onChange={(e) => setSite(e.target.value)}
        />
        <button type="submit" onClick={createNewEvent}>
          Ajouter cet évènement
        </button>
      </form>
    </div>
  );
}
