import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CurrentUserContext from "../contexts/userContext";
import userAPI from "../services/userAPI";

export default function DisplayCameras() {
  const [cameras, setCameras] = useState([]);
  const [value, setValue] = useState("");
  const { user } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  const getCameras = () => {
    userAPI.get("/api/cameras").then((response) => {
      setCameras(response.data[0]);
    });
  };

  // eslint-disable-next-line no-unused-vars
  const deleteCamera = (id) => {
    if (user) {
      userAPI
        .delete(`/api/cameras/${id}`)
        .then(() => {
          setCameras(
            cameras.filter((data) => {
              return data.id !== id;
            })
          );
          toast.success("Camera supprimé avec succes");
        })
        .catch((err) => {
          console.error(err);
        });
    } else toast.warning("Vous n'êtes pas connecté !");
  };

  useEffect(() => {
    getCameras();
  }, []);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    // console.log(value);
  };

  const write = () => {
    return value;
  };

  return (
    <div>
      <div>
        <button type="submit" onClick={() => navigate("create-camera")}>
          Créer une nouvelle camera
        </button>
        <input
          type="text"
          value={value}
          placeholder="Rechercher"
          onChange={onChange}
        />
        <button type="button" onClick={() => onSearch(value)}>
          Search
        </button>
      </div>
      <div>
        {cameras
          .filter((item) => {
            const searchTerm = value.toLowerCase();
            const model = item.model.toLowerCase();

            return (
              searchTerm && model.startsWith(searchTerm) && model !== searchTerm
            );
          })
          .slice(0, 10)
          .map((item) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            <div key={item.id} onClick={() => onSearch(item.model)}>
              {item.model}
            </div>
          ))}
        <div>{write}</div>
      </div>
    </div>
  );
}
