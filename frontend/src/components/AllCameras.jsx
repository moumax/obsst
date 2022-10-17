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

  const getCameras = async () => {
    await userAPI.get("/api/cameras").then((response) => {
      console.warn("réponse server cameras");
      setCameras(response.data[0]);
    });
  };

  const getOptics = async () => {
    await userAPI.get("/api/optics").then((response) => {
      console.warn("reponse server optics");
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

  const pouvoirSeparateur = () => {
    const calcul = 0.252 * (550 / arr[0]);
    setCool(calcul);
    console.warn("total: ", calcul);
  };

  const echantillonageEffectif = () => {
    const calcul = 206 * (arr[0] / arr[1]);
    setCool(calcul);
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
            <p>Photosites: {data.photosites}</p>
            <p>Cadence : {data.cadence}</p>
            <label htmlFor="cooler">Cooler : </label>
            <button
              type="button"
              value="cooler"
              onClick={() => calculation(data.photosites)}
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
            <p>Diametre : {data.diameterMM}mm</p>
            <p>Focal en mm: {data.focalMM}</p>
            <label htmlFor="cooler">Diametre : </label>
            <button
              type="button"
              value="cooler"
              onClick={() => calculation(data.focalMM)}
            >
              Sélectionner ce tube optique
            </button>
          </div>
        ))}
      </div>
      <button type="button" onClick={pouvoirSeparateur}>
        Calcul pouvoir séparateur :
      </button>
      {cool}
      <button type="button" onClick={echantillonageEffectif}>
        Calcul Echantillonage effectif :
      </button>
      {cool}
      <button type="button" onClick={reset}>
        Reset
      </button>
      <p>{erreur}</p>
    </div>
  );
}
