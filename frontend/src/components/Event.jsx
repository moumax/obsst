import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import userAPI from "../services/userAPI";

function Event() {
  const navigate = useNavigate();
  const [event, setEvent] = useState([]);

  const getEvent = () => {
    userAPI.get("/api/events").then((response) => {
      setEvent(response.data[0]);
    });
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
              <div>
                <p className="event-date">{data.date.slice(0, 10)}</p>{" "}
                <h2 className="event-title">{data.title}</h2>{" "}
                <p className="event-description">{data.description}</p>{" "}
                <p className="event-site">{data.site}</p>
              </div>
            </li>
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
