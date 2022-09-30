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
  const [modification, setModification] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [site, setSite] = useState("");

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

  // eslint-disable-next-line no-unused-vars
  const updateEvent = async (id) => {
    if (user) {
      try {
        const updatedEvent = {};
        if (title) updatedEvent.title = title;
        if (description) updatedEvent.description = description;
        if (date) updatedEvent.date = date;
        if (site) updatedEvent.site = site;

        await userAPI.put(`/api/events/${id}`, updatedEvent);
        toast.success("Les informations ont été mises à jour");
      } catch (err) {
        console.error(err);
        toast.warning("Erreur lors de la mise à jour");
      }
    } else toast.warning("Vous n'êtes pas connecté !");
  };

  const modificationHandler = () => {
    // eslint-disable-next-line no-shadow
    setModification((modification) => !modification);
  };

  useEffect(() => {
    getEvent();
  }, [event]);

  return (
    <div>
      <p>Composant event</p>
      <div>
        {event.map((data) => (
          <ul key={data.id}>
            <li className="date">
              {modification && (
                <div>
                  <p className="event-date">{data.date}</p>{" "}
                  <h2 className="event-title">{data.title}</h2>{" "}
                  <p className="event-description">{data.description}</p>{" "}
                  <p className="event-site">{data.site}</p>
                </div>
              )}
              {!modification && (
                <div>
                  <input
                    className="input-event"
                    type="text"
                    name="date"
                    placeholder="Date"
                    value={data.date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                  <input
                    className="input-event"
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={data.title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <input
                    className="input-event"
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={data.description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <input
                    className="input-event"
                    type="text"
                    name="site"
                    placeholder="Site"
                    value={data.site}
                    onChange={(e) => setSite(e.target.value)}
                  />
                </div>
              )}
              {user && location.pathname === "/administration" && (
                <button type="button" onClick={modificationHandler}>
                  Modifier l'event
                </button>
              )}
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
