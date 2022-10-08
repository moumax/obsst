import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CurrentUserContext from "../contexts/userContext";
import userAPI from "../services/userAPI";

export default function DisplayCameras() {
  const [cameras, setCameras] = useState([]);
  const [cool, setCool] = useState([]);
  const { user } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const arr = [];

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

  const addCool = (cooler) => {
    arr.push(cooler);
    console.warn(arr);
  };

  const total = () => {
    setCool(arr.reduce((acc, curr) => acc + curr));
  };

  useEffect(() => {
    getCameras();
  }, []);

  return (
    <div>
      <div>
        <button type="submit" onClick={() => navigate("create-camera")}>
          Créer une nouvelle camera
        </button>
      </div>
      <div>
        {cameras.map((data) => (
          <div>
            <p>{data.brand}</p>
            <p>{data.cooler}</p>
            <p>{data.cadence}</p>
            <label htmlFor="cooler">cooler</label>
            <input
              name="cooler"
              type="checkbox"
              onClick={() => addCool(data.cooler)}
            />
            <label htmlFor="cadence">cadence</label>
          </div>
        ))}
      </div>

      <button type="button" onClick={total}>
        Total
      </button>
      <h2>{cool}</h2>
    </div>
  );
}
