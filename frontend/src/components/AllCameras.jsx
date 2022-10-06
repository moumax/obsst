/* eslint-disable no-unused-vars */
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CurrentUserContext from "../contexts/userContext";
import userAPI from "../services/userAPI";

export default function DisplayCameras() {
  const [cameras, setCameras] = useState([]);
  const [cameraId, setCameraId] = useState("");
  const [model, setModel] = useState("");
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

  const handleCamera = (e) => {
    const getCameraId = e.target.value;
    // eslint-disable-next-line no-restricted-syntax
    console.log(getCameraId);
    setCameraId(getCameraId);
    setModel(e.data[0].model);
  };

  return (
    <div>
      {/* Change this link */}
      <button type="submit" onClick={() => navigate("create-camera")}>
        Créer une nouvelle camera
      </button>
      <h1>Liste des cameras</h1>
      <select name="brand" onChange={(e) => handleCamera(e)}>
        <option>---Select Camera</option>
        {cameras.map((data) => (
          <option key={data.id} value={data.id}>
            {data.brand}
          </option>
        ))}
      </select>
      <select name="brand">
        <option>---Select Model</option>
        {cameras.map((data) => (
          <option key={data.id} value={data.id}>
            {setModel}
          </option>
        ))}
      </select>
      {/* {cameras.map((data) => (
        <ul key={data.id}>
          <li>
            <h2>{data.brand}</h2>
            <p>Modèle : {data.model}</p>
            {data.sensor === "" || data.sensor === null ? (
              <p />
            ) : (
              <p>Capteur : {data.sensor}</p>
            )}
            <p>Type de capteur : {data.type}</p>
            <p>Largeur du capteur : {data.lengthmm}</p>
            <p>Hauteur du capteur : {data.heightmm}</p>
            <p>Largeur en pixel du capteur : {data.lengthpix}</p>
            <p>Hauteur en pixel du capteur : {data.heightpix}</p>
            <p>Photosites : {data.photosites}</p>
            <p>Megapixels : {data.megapixels}</p>
            {data.cadence === 0 || data.cadence === null ? (
              <p />
            ) : (
              <p>Cadence : {data.cadence} images par seconde</p>
            )}
            {data.dynamic === 0 || data.dynamic === null ? (
              <p />
            ) : (
              <p>Dynamique : {data.dynamic}</p>
            )}
            {data.bits === 0 || data.bits === null ? (
              <p />
            ) : (
              <p>Bits : {data.bits}</p>
            )}
            {data.readNoise === 0 || data.readNoise === null ? (
              <p />
            ) : (
              <p>Bruit de lecture : {data.readNoise}</p>
            )}
            {data.darkCurrent === 0 || data.darkCurrent === null ? (
              <p />
            ) : (
              <p>Courant d'obscurité : {data.darkCurrent}</p>
            )}
            {data.readTime === 0 || data.readTime === null ? (
              <p />
            ) : (
              <p>Temps de lecture du capteur : {data.readTime}</p>
            )}
            {data.capacity === 0 || data.capacity === null ? (
              <p />
            ) : (
              <p>Capacité des pixels : {data.capacity}</p>
            )}
            {data.cooler === "" || data.cooler === null ? (
              <p />
            ) : (
              <p>Refroidissement : -{data.cooler}°C</p>
            )}
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
      ))} */}
    </div>
  );
}
