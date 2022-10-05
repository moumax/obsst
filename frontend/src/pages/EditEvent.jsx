import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CurrentUserContext from "../contexts/userContext";
import userAPI from "../services/userAPI";

export default function EditEvent() {
  const [event, setEvent] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [site, setSite] = useState("");
  const { user } = useContext(CurrentUserContext);

  const navigate = useNavigate();
  const { id } = useParams();

  const getEvent = () => {
    userAPI.get(`/api/events/${id}`).then((response) => {
      setEvent(response.data[0]);
    });
  };

  const goAdmin = () => {
    navigate("/administration");
  };

  // eslint-disable-next-line no-unused-vars
  const editEvent = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        const updatedEvent = {};
        if (title) updatedEvent.title = title;
        if (description) updatedEvent.description = description;
        if (date) updatedEvent.date = date;
        if (site) updatedEvent.site = site;

        await userAPI.put(`/api/events/${id}`, updatedEvent);
        toast.success("Les informations ont été mises à jour");
        goAdmin();
      } catch (err) {
        console.error(err);
        toast.warning("Erreur lors de la mise à jour");
      }
    } else toast.warning("Vous n'êtes pas connecté !");
  };

  useEffect(() => {
    getEvent();
  }, []);

  return (
    <div>
      <h1>Modifier l'évènement</h1>
      {event.map((data) => (
        <ul key={data.id}>
          <li>
            <form>
              <input
                type="text"
                name="event-title"
                defaultValue={data.title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                name="event-description"
                defaultValue={data.description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="text"
                name="event-date"
                defaultValue={data.date.slice(0, 10)}
                onChange={(e) => setDate(e.target.value)}
              />
              <input
                type="text"
                name="event-site"
                defaultValue={data.site}
                onChange={(e) => setSite(e.target.value)}
              />
              <button type="submit" onClick={editEvent}>
                Modifier cet évènement
              </button>
              <button type="button" onClick={() => navigate("/administration")}>
                Retour à la page admin
              </button>
            </form>
          </li>
        </ul>
      ))}
    </div>
  );
}
