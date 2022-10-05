import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CurrentUserContext from "../contexts/userContext";
import userAPI from "../services/userAPI";

export default function DisplayEvent() {
  const [event, setEvent] = useState([]);
  const { user } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  const getEvent = () => {
    userAPI.get("/api/events").then((response) => {
      setEvent(response.data[0]);
    });
  };

  const deleteEvent = (id) => {
    if (user) {
      userAPI
        .delete(`/api/events/${id}`)
        .then(() => {
          setEvent(
            event.filter((data) => {
              return data.id !== id;
            })
          );
          toast.success("Evènement supprimé avec succes");
        })
        .catch((err) => {
          console.error(err);
        });
    } else toast.warning("Vous n'êtes pas connecté !");
  };

  useEffect(() => {
    getEvent();
  }, []);

  return (
    <div>
      <button type="submit" onClick={() => navigate("create-event")}>
        Créer un nouvel évènement
      </button>
      <h1>Liste des évènements</h1>
      {event.map((data) => (
        <ul key={data.id}>
          <li>
            <h2>{data.title}</h2>
            <button
              type="button"
              onClick={() => navigate(`/administration/edit-event/${data.id}`)}
            >
              Modifier l'event
            </button>
            <button type="submit" onClick={() => deleteEvent(data.id)}>
              Supprimer l'event {data.title}
            </button>
          </li>
        </ul>
      ))}
    </div>
  );
}
