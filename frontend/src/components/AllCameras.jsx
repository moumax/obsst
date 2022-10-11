import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CurrentUserContext from "../contexts/userContext";
import userAPI from "../services/userAPI";

export default function DisplayCameras() {
  const [cameras, setCameras] = useState([]);
  const [optics, setOptics] = useState([]);
  const [cool, setCool] = useState([]);
  const [erreur, setErreur] = useState("");
  const { user } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  let arr = [];

  const getCameras = () => {
    userAPI.get("/api/cameras").then((response) => {
      setCameras(response.data[0]);
    });
  };

  const getOptics = () => {
    userAPI.get("/api/optics").then((response) => {
      setOptics(response.data[0]);
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

  const calculation = (values) => {
    setErreur("");
    console.warn("add Cooler");
    arr.push(values);
    console.warn("arr:", arr);
  };

  const reset = () => {
    arr = [];
    console.warn("arr reset:", arr);
    setCool([]);
    setErreur("");
  };

  const total = () => {
    if (arr.length === 1) {
      console.warn("ATTENTION 1 SEULE VALEUR AJOUTE");
      setErreur("ATTENTION, 1 SEULE VALEUR AJOUTE");
    }
    if (arr.length === 0) {
      console.warn("ATTENTION PAS DE VALEUR AJOUTE");
      setErreur("ATTENTION, PAS DE VALEUR AJOUTE");
    } else {
      const calcul = arr.reduce((curr, acc) => {
        return curr + acc;
      });
      setCool(calcul);
      console.warn("total: ", calcul);
    }
  };

  useEffect(() => {
    getCameras();
    getOptics();
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
          <div key={data.id}>
            <p>Marque : {data.brand}</p>
            <p>Cooler : {data.cooler}°C</p>
            <p>Cadence : {data.cadence}</p>
            <label htmlFor="cooler">Cooler : </label>
            <button
              type="button"
              value="cooler"
              onClick={() => calculation(data.cooler)}
            >
              Sélectionner cette caméra
            </button>
          </div>
        ))}
      </div>
      <div>
        {optics.map((data) => (
          <div key={data.id}>
            <p>Marque : {data.brand}</p>
            <p>Cooler : {data.diameterMM}mm</p>
            <label htmlFor="cooler">Diametre : </label>
            <button
              type="button"
              value="cooler"
              onClick={() => calculation(data.diameterMM)}
            >
              Sélectionner ce tube optique
            </button>
          </div>
        ))}
      </div>
      <button type="button" onClick={total}>
        Total
      </button>
      <button type="button" onClick={reset}>
        Reset
      </button>
      <h2>Calcul de cooler : {cool}°C</h2>
      <p>{erreur}</p>
    </div>
  );
}
