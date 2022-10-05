import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CurrentUserContext from "../contexts/userContext";
import userAPI from "../services/userAPI";

export default function DisplayCameras() {
  const [cameras, setCameras] = useState([]);
  const { user } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  const getCameras = () => {
    userAPI.get("/api/cameras").then((response) => {
      setCameras(response.data[0]);
    });
  };

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

  return (
    <div>
      {/* Change this link */}
      <button type="submit" onClick={() => navigate("create-camera")}>
        Créer une nouvelle camera
      </button>
      <h1>Liste des cameras</h1>
      {cameras.map((data) => (
        <ul key={data.id}>
          <li>
            <h2>{data.marque}</h2>
            <p>Modèle : {data.modele}</p>
            <p>Capteur : {data.capteur}</p>
            <p>Type de capteur : {data.type}</p>
            <p>Largeur du capteur : {data.largeurMM}</p>
            <p>Hauteur du capteur : {data.hauteurMM}</p>
            <p>Largeur en pixel du capteur : {data.largeurPix}</p>
            <p>Hauteur en pixel du capteur : {data.hauteurPix}</p>
            <p>Photosites : {data.photosites}</p>
            <p>Megapixels : {data.megapixels}</p>
            <p>Dynamique : {data.dynamique}</p>
            <p>Bits : {data.bits}</p>
            <p>Bruit de lecture : {data.bruitLecture}</p>
            <p>Courant d'obscurité : {data.courantObscurite}</p>
            <p>Temps de lecture du capteur : {data.tempsLecture}</p>
            <p>Capacité des pixels : {data.capacitePixel}</p>
            <p>Refroidissement : -{data.refroidissement}°C</p>

            {/* Change this link */}
            <button
              type="button"
              onClick={() => navigate(`/administration/edit-event/${data.id}`)}
            >
              Modifier la camera
            </button>
            <button type="submit" onClick={() => deleteCamera(data.id)}>
              Supprimer la camera {data.modele}
            </button>
          </li>
        </ul>
      ))}
    </div>
  );
}
