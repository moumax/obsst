import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import userAPI from "../services/userAPI";
import CurrentUserContext from "../contexts/userContext";

function Event() {
  const navigate = useNavigate();
  const [event, setEvent] = useState([]);
  const { user } = useContext(CurrentUserContext);
  const location = useLocation();

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
  }, [event]);

  return (
    <div>
      <p>Composant event</p>
      <div className="timeline">
        {event.map((data) => (
          <ul key={data.id}>
            <li className="date">
              <p className="event-date">{data.date}</p>
              <h2 className="event-title">{data.title}</h2>
              <p className="event-description">{data.description}</p>
              <p className="event-site">{data.site}</p>
            </li>
            {user && location.pathname === "/administration" && (
              <button type="submit" onClick={() => deleteEvent(data.id)}>
                Supprimer l'event {data.title}
              </button>
            )}
          </ul>
        ))}
      </div>
      <button type="button" onClick={() => navigate("/")}>
        Retour à la page d'accueil
      </button>
    </div>
  );
}

export default Event;
