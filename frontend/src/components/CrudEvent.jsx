import { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import CurrentUserContext from "../contexts/userContext";
import userAPI from "../services/userAPI";

export default function UpdateEvent() {
  const [event, setEvent] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [site, setSite] = useState("");
  const { user } = useContext(CurrentUserContext);

  const getEvent = () => {
    userAPI.get("/api/events").then((response) => {
      setEvent(response.data[0]);
    });
  };

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
    <>
      <div>
        <p>Add Event</p>
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
      <div>
        <p>Modify Event</p>
        {event.map((data) => (
          <form key={data.id}>
            <input
              type="text"
              name="event-title"
              placeholder="Titre"
              defaultValue={data.title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              name="event-description"
              placeholder="Description"
              defaultValue={data.description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="text"
              name="event-date"
              placeholder="Date"
              defaultValue={data.date}
              onChange={(e) => setDate(e.target.value)}
            />
            <input
              type="text"
              name="event-site"
              placeholder="Site"
              defaultValue={data.site}
              onChange={(e) => setSite(e.target.value)}
            />
            <button type="button" onClick={() => updateEvent(data.id)}>
              Envoyer la modification
            </button>
            <button type="submit" onClick={() => deleteEvent(data.id)}>
              Supprimer l'event {data.title}
            </button>
          </form>
        ))}
      </div>
    </>
  );
}
